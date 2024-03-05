import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'; // Add bcrypt import
import jwt from 'jsonwebtoken'; // Add jwt import
import UsersRouter from './routes/user.js';
import ItemsRouter from './routes/items.js';
import { addUser, checkUser, getUsers } from './models/Users.js';

config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use('/users', UsersRouter);
app.use('/items', ItemsRouter);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});

app.post('/login', async (req, res) => {
    const { userUsername, userPassword } = req.body;
    try {
        const storedPassword = await checkUser(userUsername);
        if (!storedPassword) {
            return res.status(401).send({
                msg: 'User not found'
            });
        }
        if (userPassword === storedPassword) {
            const token = jwt.sign({ userUsername: userUsername }, process.env.SECRET_KEY);
            return res.send({
                token: token,
                msg: 'You have logged in'
            });
        } else {
            return res.status(401).send({
                msg: 'Passwords do not match'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg: 'Internal Server Error'
        });
    }
});


import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'; // Add bcrypt import
import jwt from 'jsonwebtoken'; // Add jwt import
import UsersRouter from './routes/user.js';
import LoginRouter from './routes/login.js'
import ItemsRouter from './routes/items.js';
import { addUser, checkUser, getUsers } from './models/Users.js';
import { createToken } from './middleware/auth.js';

config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use('/users', UsersRouter);
app.use('/items', ItemsRouter);
app.use('/login', createToken, LoginRouter)

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});

// app.post('/login', async (req, res) => {
//     const { userUsername, userPassword } = req.body;
//     try {
//         const hashPassword = await checkUser(userUsername);
//         if (!hashPassword) {
//             return res.status(401).send({
//                 msg: 'User not found'
//             });
//         }
//         bcrypt.compare(userPassword, hashPassword, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send({
//                     msg: 'Internal Server Error'
//                 });
//             }
//             if (result) {
//                 const token = jwt.sign({ userUsername: userUsername }, process.env.SECRET_KEY);
//                 return res.send({
//                     token: token,
//                     msg: 'You have logged in'
//                 });
//             } else {
//                 return res.status(401).send({
//                     msg: 'Passwords do not match'
//                 });
//             }
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({
//             msg: 'Internal Server Error'
//         });
//     }
// });


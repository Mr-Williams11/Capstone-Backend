import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUsers, getUserById, addUser, editUser, deleteUser, checkUser } from "../models/Users.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default {
    getUsers: async (req, res) => {
        try {
            const users = await getUsers();
            res.send(users);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = +req.params.userId;
            const user = await getUserById(userId);
            if (!user) {
                res.status(404).send({ error: 'User not found' });
                return;
            }
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    addUser: async (req, res) => {
        try {
            const { userName, userAge, userEmail, userRole, userPassword, userUsername } = req.body;
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            await addUser(userName, userAge, userEmail, userRole, hashedPassword, userUsername);
            res.send({
                msg: 'New User Added'
            });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    editUser: async (req, res) => {
        try {
            const { userName, userAge, userEmail, userRole, userPassword, userUsername } = req.body;
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            await editUser(+req.params.userId, userName, userAge, userEmail, userRole, hashedPassword, userUsername);
            res.send({ msg: 'Edited User Successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await deleteUser(req.params.userId);
            if (!deletedUser) {
                res.status(404).send({ error: 'User not found' });
                return;
            }
            res.send({ msg: 'User Deleted Successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    logIn: async (req, res, next) => {
        console.log(JSON.stringify(req.body));
        const { userUsername, userPassword } = req.body;
        try {
            const hashpassword = await checkUser(userUsername);
            const result = await bcrypt.compare(userPassword, hashpassword); // Compare with hashed password
            if (result) {
                const token = jwt.sign({ userUsername }, JWT_SECRET, { expiresIn: '1h' });
                // res.json({ token });
                return;
            }
            res.status(401).json({ error: 'Authentication failed' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
};

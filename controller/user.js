import { getUsers, getUserById, addUser, editUser, deleteUser } from "../models/Users.js";

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
            await addUser(userName, userAge, userEmail, userRole, userPassword, userUsername);
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
            await editUser(+req.params.userId, userName, userAge, userEmail, userRole, userPassword, userUsername);
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
    }
};

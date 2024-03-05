import { pool } from '../config/config.js';

const getUsers = async () => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM users
        `);
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM users
            WHERE userId = ?
        `, [userId]);
        return result[0];
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

const addUser = async (userName, userAge, userEmail, userRole, userPassword, userUsername) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO users (userName, userAge, userEmail, userRole, userPassword, userUsername) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [userName, userAge, userEmail, userRole, userPassword, userUsername]);
        return result;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

const editUser = async (userId, userName, userAge, userEmail, userRole, userPassword, userUsername) => {
    try {
        await pool.query(`
            UPDATE users 
            SET userName = ?, userAge = ?, userEmail = ?, userRole = ?, userPassword = ?, userUsername = ? 
            WHERE userId = ?
        `, [userName, userAge, userEmail, userRole, userPassword, userUsername, userId]);
        const updatedUser = await getUserById(userId);
        return updatedUser;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM users
            WHERE userId = ?
        `, [userId]);
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
const checkUser = async (userName) => {
    try {
        const [[{ userPassword }]] = await pool.query(`
            SELECT userPassword  
            FROM users 
            WHERE userName = ?
        `, [userName]);
        return userPassword;
    } catch (error) {
        console.error("Error checking user:", error);
        throw error;
    }
};


export { getUserById, getUsers, addUser, editUser, deleteUser, checkUser };

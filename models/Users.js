import { pool } from '../config/config.js';

// USER FUNCTIONS
const getUsers = async () => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM Users
        `);
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const getUserById = async (userID) => {
    try {
        const [result] = await pool.query(`
            SELECT *
            FROM Users
            WHERE userId = ?
        `, [userID]);
        return result[0];
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

const addUser = async (userName, userAge, userEmail, userRole, userPassword, userUsername) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO Users (userName, userAge, userEmail, userRole, userPassword, userUsername) 
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
            UPDATE Users 
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
            DELETE FROM Users
            WHERE userId = ?
        `, [userId]);
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export { getUserById, getUsers, addUser, editUser, deleteUser };

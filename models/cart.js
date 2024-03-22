import { pool } from '../config/config.js';

const getCarts = async (userId) => {
    const [cart] = await pool.query(`
        SELECT * FROM cart WHERE userId = ?
    `, [userId]);
    return cart;
};

const getItem = async (cartId) => {
    const [item] = await pool.query(`
        SELECT * FROM cart WHERE cartId = ?
    `, [cartId]);
    return item;
};

const addProd = async (userId, productId, productName, productDesc, category, price, productUrl) => {
    const [item] = await pool.query(`
        INSERT INTO cart (userId, productId, productName, productDesc, Category, Price, productUrl) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [userId, productId, productName, productDesc, category, price, productUrl]);
    return item;
};

const editQuan = async (cartId, quantity) => {
    await pool.query(`
        UPDATE cart SET quantity = ? WHERE cartId = ?
    `, [quantity, cartId]);
    return getItem(cartId);
};

const deleteCart = async (cartId) => {
    await pool.query(`
        DELETE FROM cart WHERE cartId = ?
    `, [cartId]);
    return { message: 'Cart deleted successfully' };
};

const clearCart = async (userId) => {
    await pool.query(`
        DELETE FROM cart WHERE userId = ?
    `, [userId]);
    return { message: 'Cart cleared successfully' };
};

const displayCart = async (userId) => {
    const [cart] = await pool.query(`
        SELECT productName, productDesc, Category, Price, productUrl, COUNT(cartId) as quantity
        FROM cart
        WHERE userId = ?
        GROUP BY productId;
    `, [userId]);
    return cart;
};

export { getCarts, getItem, addProd, editQuan, deleteCart, clearCart, displayCart };

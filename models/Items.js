import { pool } from '../config/config.js';

const getAllItems = async () => {
    try {
        const [products] = await pool.query(`
            SELECT *
            FROM products
        `);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const getItemById = async (prodID) => {
    try {
        const [product] = await pool.query(`
            SELECT *
            FROM products
            WHERE productId = ?
        `, [prodID]);
        return product[0];
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

const addingItem = async (prodName, productDesc, Category, Price, productUrl, userId) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO products (productName, productDesc, Category, Price, productUrl, userId) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [prodName, productDesc, Category, Price, productUrl, userId]);
        return result;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

const editingItem = async (prodName, productDesc, Category, Price, productUrl, userId, prodID) => {
    try {
        await pool.query(`
            UPDATE products 
            SET productName = ?, productDesc = ?, Category = ?, Price = ?, productUrl = ?, userId = ? 
            WHERE productId = ?
        `, [prodName, productDesc, Category, Price, productUrl, userId, prodID]);
        const updatedProduct = await getProductById(prodID);
        return updatedProduct;
    } catch (error) {
        console.error("Error editing product:", error);
        throw error;
    }
};

const delItem = async (prodID) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM products
            WHERE productId = ?
        `, [prodID]);
        return result;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export { getItemById, getAllItems, addingItem, editingItem, delItem };

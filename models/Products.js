import { pool } from '../config/config.js';

// PRODUCT FUNCTIONS
const getProducts = async () => {
    try {
        const [products] = await pool.query(`
            SELECT *
            FROM Products
        `);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const getProductById = async (prodID) => {
    try {
        const [product] = await pool.query(`
            SELECT *
            FROM Products
            WHERE productId = ?
        `, [prodID]);
        return product[0];
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

const addProduct = async (prodName, productDesc, Category, Price, productUrl, userId) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO Products (productName, productDesc, Category, Price, productUrl, userId) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [prodName, productDesc, Category, Price, productUrl, userId]);
        return result;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

const editProduct = async (prodName, productDesc, Category, Price, productUrl, userId, prodID) => {
    try {
        await pool.query(`
            UPDATE Products 
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

const deleteProduct = async (prodID) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM Products
            WHERE productId = ?
        `, [prodID]);
        return result;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export { getProductById, getProducts, addProduct, editProduct, deleteProduct };

import { getAllItems, getItemById, addingItem, editingItem, delItem } from "../models/Items.js";

export default {
    getAllItems: async (req, res) => {
        try {
            const products = await getAllItems();
            res.send(products);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    getItemById: async (req, res) => {
        try {
            const productId = +req.params.productId;
            const product = await getProductById(productId);
            if (!product) {
                res.status(404).send({ error: 'Product not found' });
                return;
            }
            res.send(product);
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    addingItem: async (req, res) => {
        try {
            const { productName, productDesc, Category, Price, productUrl, userId } = req.body;
            await addProduct(productName, productDesc, Category, Price, productUrl, userId);
            res.send({
                msg: 'New Product Added'
            });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    editingItem: async (req, res) => {
        try {
            const { productName, productDesc, Category, Price, productUrl } = req.body;
            await editProduct(productName, productDesc, Category, Price, productUrl, +req.params.productId);
            res.send({ msg: 'Edited Product Successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    },
    delItem: async (req, res) => {
        try {
            const deletedProduct = await deleteProduct(req.params.productId);
            if (!deletedProduct) {
                res.status(404).send({ error: 'Product not found' });
                return;
            }
            res.send({ msg: 'Product Deleted Successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
};
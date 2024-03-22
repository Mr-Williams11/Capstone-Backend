import { getCarts, displayCart, editQuan, deleteCart, getItem, addProd, clearCart } from "../models/cart.js";

export default {
    displayCart: async (req, res) => {
        try {
            res.send(await displayCart(+req.params.userID));
        } catch (e) {
            res.status(404).json({
                status: 404,
                msg: 'Error when fetching cart'
            });
        }
    },
    getItem: async (req, res) => {
        try {
            res.send(await getItem(+req.params.cartID));
        } catch (e) {
            res.status(404).json({
                status: 404,
                msg: 'Error when getting a specific item'
            });
        }
    },
    addProd: async (req, res) => {
        try {
            const { userId, productId, productName, productDesc, category, price, productUrl } = req.body;
            await addProd(userId, productId, productName, productDesc, category, price, productUrl);
            res.send({
                msg: 'New product has been added'
            });
        } catch (err) {
            res.status(404).json({
                status: 404,
                msg: 'Error when adding this product'
            });
        }
    },
    editQuan: async (req, res) => {
        try {
            let { quantity } = req.body;
            const quan = await getItem(+req.params.cartID);
            quantity = quantity ? quantity : quan.quantity;
            await editQuan(+req.params.cartID, quantity);
            res.json(await getCarts(quan.userId));
        } catch (e) {
            res.status(404).json({
                status: 404,
                msg: 'Cannot edit cart'
            });
        }
    },
    deleteFromCart: async (req, res) => {
        try {
            await deleteCart(+req.params.cartID);
            res.json({
                status: 200,
                msg: 'Cart deleted successfully'
            });
        } catch (e) {
            res.status(404).json({
                status: 404,
                msg: 'Unable to delete'
            });
        }
    },
    clearCart: async (req, res) => {
        try {
            await clearCart(+req.params.userID);
            res.json({
                status: 200,
                msg: 'Cart cleared successfully'
            });
        } catch (e) {
            res.status(404).json({
                status: 404,
                msg: 'Unable to delete'
            });
        }
    }
};

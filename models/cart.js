import {pool} from '../config/config.js'

const getCarts = async(userId)=>{
    const [cart] = await pool.query(`
    SELECT * FROM cart WHERE userId = ?
    `,[userId])
    return cart
}
const getItem = async(cartId)=>{
    const [item] = await pool.query(`
    SELECT * FROM cart WHERE cartId = ?
    `,[cartId])
    return item 
}
const addProd = async(quantity)=>{
    const [item] = await pool.query(`
    INSERT INTO cart (quantity) VALUES (?)
    `,[quantity])
    return item
}
const editQuan = async(cartID,quantity)=>{
    const [quan] = await pool.query(`
    UPDATE cart SET quantity = ?  WHERE (cartId = ?)
    `,[quantity,cartID])
    return getCarts(quan)
}

const deleteCart = async(cartId)=>{
    const [cart] = await pool.query(`
    DELETE FROM cart WHERE cartId = ?
    `,[cartId])
    return getCarts(cart)
}
const clearCart = async(userId)=>{
    const [clear] = await pool.query(`
    DELETE FROM cart WHERE userId = ?
    `,[userId])
    return getCarts(clear)
}
const displayCart = async(userId)=>{
    const [cart] = await pool.query(`
    SELECT DISTINCT  productName, Price, productUrl, Category, COUNT(cartId) as quantity
    FROM cart
    INNER JOIN products ON Cart.productId = Products.productId
    WHERE cart.userIc = ?
    GROUP BY productName;
    `,[userId])
    return cart
}
export {getCarts,getItem,editQuan,deleteCart, addProd ,displayCart ,clearCart}
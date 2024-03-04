import express from 'express';
import controller from '../controller/products.js'

const router = express.Router()
router.route('/')

.get(controller.getProducts)
.post(controller.addProduct)

router.route('/:prodId')

.get(controller.getProduct)
.patch(controller.editProduct)
.delete(controller.deleteProduct)

export default router
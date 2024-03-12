import express from 'express';
import controller from '../controller/Items.js'

const router = express.Router()
router.route('/')

.get(controller.getAllItems)
.post(controller.addingItem)

router.route('/:productId')

.get(controller.getItemId)
.patch(controller.editingItem)
.delete(controller.delItem)

export default router
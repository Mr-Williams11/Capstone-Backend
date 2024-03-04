import express from 'express';
import controller from '../controller/user.js'

const router = express.Router()
router.route('/')

.get(controller.getUsers)
.post(controller.addUser)

router.route('/:userId')

.get(controller.getUser)
.patch(controller.editUser)
.delete(controller.deleteUser)

export default router

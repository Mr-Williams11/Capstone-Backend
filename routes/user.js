import express from 'express';
import controller from '../controller/user.js'

const router = express.Router()
router.route('/')

.get(controller.getUsers)
.post(controller.addUser)

router
    .route('/login')
        .post(controller.logIn)

router.route('/:userId')

.get(controller.getUserById)
.patch(controller.editUser)
.delete(controller.deleteUser)

export default router

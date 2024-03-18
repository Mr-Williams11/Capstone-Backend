import express from 'express';
import controller from '../controller/user.js'
import { createToken } from '../middleware/auth.js';

const router = express.Router()
router
    .route('/',createToken)
        .post(controller.logIn)


export default router

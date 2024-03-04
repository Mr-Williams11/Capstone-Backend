import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UsersRouter from './routes/user.js'
import ProductsRouter from './routes/products.js'
config()

const PORT = process.env.PORT
const app = express()




app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('static'))
app.use('/users',UsersRouter)
app.use('/products',ProductsRouter)

app.listen(PORT, ()=>{
    console.log('Server is running on http://localhost:' + PORT);
})
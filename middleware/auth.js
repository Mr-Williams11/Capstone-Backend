import {config} from 'dotenv'
config()
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkUser } from '../models/Users.js';

// middleware for authentication of the user
const verifyToken = (req, res, next) => {
    let { cookie } = req.headers;
    let tokenInHeader = cookie && cookie.split('=')[1];
    if (!tokenInHeader) {
        return res.sendStatus(401);
    }
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).send({ msg: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};
// Token generator
const createToken = async (req, res, next) => {
        console.log('user info:'+JSON.stringify(req.body));
        const {userUsername, userPassword} = req.body
        const hashedUserPass = await checkUser(userUsername)
        bcrypt.compare(userPassword,hashedUserPass,(err,result) =>{
            if (err) throw err
            if(result === true){
                const token = jwt.sign({userUsername:userUsername}, process.env.SECRET_KEY,{expiresIn:'1h'})
                res.cookie('jwt', token, {httpOnly:false})
                res.send({
                    token:token,
                    msg: "You have logged in successfully!"})
                next()
            }else {
                res.send({msg: "The username or password does not match"})
            }
        })
    }
    // exporting functions
    export {verifyToken, createToken}
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../keys.js';
import mongoose from 'mongoose';
const User = mongoose.model("User")
export const requireLoginAccess = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error : 'you must be logged in'})
        }
        const {_id} = payload
        User.findById(_id).then((userData)=>{
            req.user = userData;
            next();
        })

    })
}
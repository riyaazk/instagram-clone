import express from 'express';
import bcrypt from 'bcryptjs';
export const router = express.Router();

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../keys.js';

const User = mongoose.model("User");



router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({error: 'please add all the fields'});
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:'user already exist with the given email'})
        }
        bcrypt.hash(password,12).then((hashedPassword)=>{
            const user = new User({
                email,
                password :  hashedPassword,
                name
            })
            user.save().then((user=>{
                res.json({message : 'signed up successfully'})
            })).catch(err=>{
                console.log(err);
            })
        })

    }).catch(err=>{
        console.log(err);
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).then({error:'please enter email or password'})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:'Invalid email or password'});
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                //res.json({message : "user signed in successfully"})
                const token = jwt.sign({_id : savedUser._id},JWT_SECRET)
                const {_id, name, email} = savedUser;
                res.json({token, user : {_id, name,email}})
            }else{
                return res.status(422).json({error:'Invalid email or password'})
            }
        })
    }).catch(error=>{
        console.log('error',error);
    })
})


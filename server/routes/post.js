import express from 'express';
export const postRouter = express.Router();
import { requireLoginAccess } from '../middleware/requireLogin.js';
import mongoose from 'mongoose';
const Post = mongoose.model('Post');

postRouter.post('/createpost',requireLoginAccess,(req,res)=>{
    const {title,body,imageUrl} = req.body;

    if(!title || !body || !imageUrl ){
        return res.status(422).json({error: 'Please add all the fields'});
    }
    
    
    req.user.password  = undefined;
    const post = new Post({
        title,
        body,
        photo : imageUrl,
        postedBy : req.user
    })
    console.log(post);
    post.save().then(result =>{
        res.json({post : result});

    }).catch(err=>{
        console.log(err);
    })
})

postRouter.get('/posts', requireLoginAccess,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name").then(result=>{
        console.log(result);
        res.json({posts: result})
    }).catch(error=>{
        console.log(error);
        res.json({error:error})
    })
})

postRouter.post('/myposts', requireLoginAccess ,(req,res)=>{
    Post.find({postedBy : req.user._id})
    .populate("postedBy","_id name").then(myPosts =>{
        res.json({myPosts})
    }).catch(err=>{
        console.log(err);
    })
})
import mongoose from "mongoose";
const { ObjectId} = mongoose.Types
const Post = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body :{
        type :String,
        required : true
    },
    photo :{
        type :String,
        required : true
    },
    postedBy :{
        type : ObjectId,
        ref : "User"
    }
})

export const postSchema  = mongoose.model("Post",Post);
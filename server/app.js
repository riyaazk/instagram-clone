import express from 'express';
import mongoose from 'mongoose';
import { MONGOURI } from './keys.js';
import { userSchemaModel } from './models/user.js';
import { postSchema } from './models/post.js';
import { router } from './routes/auth.js';
import  { postRouter}  from './routes/post.js';


const app = express();
const PORT = 5000;

mongoose.connect(MONGOURI);
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo successfully!!');
})
mongoose.connection.on('error',(err)=>{
    console.log('Error connecting to mongo : ',err);
})

app.use(express.json())
app.use(router);
app.use(postRouter);

app.listen(PORT,()=>{
    console.log('server is running on port ',PORT);
})
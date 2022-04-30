import mongoose from 'mongoose';
import blogModel from '../schemas/blogSchema.js';
import userModel from '../schemas/userSchema.js';

const addUsersToBlogs = async () => {
    const mongooseURL = "mongodb+srv://rafieisi:Sr110115118@cluster0.k8q9v.mongodb.net/mydb?retryWrites=true&w=majority"
    mongoose.connect(mongooseURL)
    const blogs = await blogModel.find()
    const users = await userModel.find()

    for(var i = 0; i<blogs.length;i++){
         blogs[i]["userID"] = (String(users[(Math.floor(Math.random()*4))]._id))
    }

    for(var i = 0; i<blogs.length;i++){
        await blogModel.updateOne({_id:blogs[i]["_id"]},blogs[i])
   }
}

addUsersToBlogs()
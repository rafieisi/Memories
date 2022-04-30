import mongoose from 'mongoose';
import blogModel from '../schemas/blogSchema.js'

const getAllBlogs = async () => {
    const mongooseURL = "mongodb+srv://rafieisi:Sr110115118@cluster0.k8q9v.mongodb.net/mydb?retryWrites=true&w=majority"
    mongoose.connect(mongooseURL)
    const blogs = await blogModel.find()
    const newBlogs = []
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    for(let i=0;i<20;i++){
        newBlogs.push({
            _id: genRanHex(24),
            title:blogs[0]["title"] + ` part ${i+1}`,
            content: blogs[0]["content"],
            image: blogs[0]["image"],
            likes: [],
            dislikes: []
        })
    }

    await blogModel.insertMany(newBlogs).then(()=>{console.log("added new blogs")})
}

const deleteAllBlogs = async () => {
    const mongooseURL = "mongodb+srv://rafieisi:Sr110115118@cluster0.k8q9v.mongodb.net/mydb?retryWrites=true&w=majority"
    mongoose.connect(mongooseURL)
    await blogModel.deleteMany({})
    return;
}

getAllBlogs()
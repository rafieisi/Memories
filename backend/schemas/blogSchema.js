import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    userID: String,
    title: String,
    content: String,
    image: String,
    likes: Number,
    dislikes: Number,
    tags:{
        type:[String],
        default:["toronto","fun","letsdothis"]
    }
})

const blogModel = mongoose.model("blog",blogSchema)
export default blogModel

import blogModel from '../schemas/blogSchema.js'

export const getAllBlogs = async (req, res) => {
    const blogs = await blogModel.find()
    res.send(blogs)
}

export const saveBlog = async(req,res) => {
    const newBlog = await blogModel.create(req.body)
    res.status(200).send("blog added!")
}

export const deleteBlog = async(req,res) => {
    await blogModel.findByIdAndDelete(req.params._id)
    res.status(200).send("blog deleted!")
}

export const updateBlog = async(req,res) => {
    await blogModel.findByIdAndUpdate(req.params._id,req.body)
    res.status(200).send("blog updated")
}

export const addLike = async(req,res) => {
    const blogId = req.params._id;
    await blogModel.findById(blogId,async (err,blog)=>{
        let totalLikes = parseInt(blog.likes) + 1
        await blogModel.findByIdAndUpdate(blogId,{likes:totalLikes})
        res.status(200).send(`added a like to blog ${req.params._id}`)      
    }).clone()
}

export const addDislike = async(req,res) => {
    const blogId = req.params._id;
    await blogModel.findById(blogId,async (err,blog)=>{
        let totalDislikes = parseInt(blog.dislikes) + 1
        await blogModel.findByIdAndUpdate(blogId,{dislikes:totalDislikes})
        res.status(200).send(`added a like to blog ${req.params._id}`)      
    }).clone()
}

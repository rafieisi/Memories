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
    const userID = req.params.userID;
    await blogModel.findById(blogId,async (err,blog)=>{
        let blogLikes = [...blog.likes]
        let blogDisklikes = [...blog.dislikes]

        if(!blogLikes.includes(userID)){
            blogLikes.push(userID)
        }

        if(blogDisklikes.includes(userID)){
            let index = blogDisklikes.indexOf(userID);
            blogDisklikes.splice(index,1)
        }

        await blogModel.findByIdAndUpdate(blogId,{likes:blogLikes, dislikes:blogDisklikes})
        res.status(200).send(`user ${userID} added a like to blog ${req.params._id}`)      
    }).clone()
}

export const removeLike = async(req,res) => {
    const blogId = req.params._id;
    const userID = req.params.userID;
    await blogModel.findById(blogId,async (err,blog)=>{
        let blogLikes = [...blog.likes]

        if(blogLikes.includes(userID)){
            let index = blogLikes.indexOf(userID);
            blogLikes.splice(index,1)
        }

        await blogModel.findByIdAndUpdate(blogId,{likes:blogLikes})
        res.status(200).send(`user ${userID} removed a like to blog ${req.params._id}`)      
    }).clone()
}

export const addDislike = async(req,res) => {
    const blogId = req.params._id;
    const userID = req.params.userID;
    await blogModel.findById(blogId,async (err,blog)=>{
        let blogDislikes = [...blog.dislikes]
        let blogLikes = [...blog.likes]

        if(!blogDislikes.includes(userID)){
            blogDislikes.push(userID)
        }

        if(blogLikes.includes(userID)){
            let index = blogLikes.indexOf(userID);
            blogLikes.splice(index,1)
        }

        await blogModel.findByIdAndUpdate(blogId,{dislikes:blogDislikes, likes: blogLikes})
        res.status(200).send(`user ${userID} added a dislike to blog ${req.params._id}`)      
    }).clone()
}

export const removeDislike = async(req,res) => {
    const blogId = req.params._id;
    const userID = req.params.userID;
    await blogModel.findById(blogId,async (err,blog)=>{
        let blogDisklikes = [...blog.dislikes]

        if(blogDisklikes.includes(userID)){
            let index = blogDisklikes.indexOf(userID);
            blogDisklikes.splice(index,1)
        }

        await blogModel.findByIdAndUpdate(blogId,{dislikes:blogDisklikes})
        res.status(200).send(`user ${userID} removed a dislike to blog ${req.params._id}`)      
    }).clone()
}

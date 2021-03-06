import blogModel from '../schemas/blogSchema.js'
const numberOfPages = 12
export const getNumberOfPages = async (req,res)=>{
    const searchTerm = req.params.searchTerm;
    
    if(searchTerm == "all"){
        blogModel.count((err, count)=>{
            res.send({count:Math.ceil(count/12)})
        })
    }else{
        blogModel.count({'title':{$regex:`${searchTerm}`,$options:'i'}},(err, count)=>{
            res.send({count:Math.ceil(count/12)})
        })
    }
}

export const getBlogs = async (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const pageNumber = req.params.pageNumber - 1;
    let blogs;
    if(searchTerm == "all"){
        blogs = await blogModel.find().skip(pageNumber * numberOfPages).limit(numberOfPages)
    }else{
        blogs = await blogModel.find({'title':{$regex:`${searchTerm}`,$options:'i'}}).skip(pageNumber * numberOfPages).limit(numberOfPages)
    }
    res.send(blogs)
}

export const getNumberOfPersonalPages = async (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const userID = req.params.userID;
    
    if(searchTerm == "all"){
        blogModel.count({'userID':userID},(err, count)=>{
            res.send({count:Math.ceil(count/12)})
        })
    }else{
        blogModel.count({'userID':userID,'title':{$regex:`${searchTerm}`,$options:'i'}},(err, count)=>{
            res.send({count:Math.ceil(count/12)})
        })
    }
}

export const getPersonalBlogs = async (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const pageNumber = req.params.pageNumber - 1;
    const userID = req.params.userID;
    let blogs;
    if(searchTerm == "all"){
        blogs = await blogModel.find({'userID':userID}).skip(pageNumber * numberOfPages).limit(numberOfPages)
    }else{
        blogs = await blogModel.find({'userID':userID,'title':{$regex:`${searchTerm}`,$options:'i'}}).skip(pageNumber * numberOfPages).limit(numberOfPages)
    }
    res.send(blogs)
}
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const blogs = createSlice({
    name:"blogs",
    initialState: {value:[]},
    reducers:{
        setBlogs:(state,action)=>{
            state.value = action.payload
        },
        addBlog:(state,action)=>{
            let newBlog = action.payload.blog
            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            newBlog["_id"] = genRanHex(24);
            state.value.push(action.payload.blog)

            //add to the database
            axios.post("http://localhost:5000/blogs/newBlog",newBlog)
        },
        deleteBlog:(state,action)=>{
            state.value = state.value.filter(blog=>blog._id!=action.payload._id)
            axios.delete(`http://localhost:5000/blogs/deleteBlog/${action.payload._id}`)
        },
        addBlogLike:(state,action)=>{
            const index = state.value.findIndex(blog=>blog._id==action.payload._id)
            const likes = state.value[index]["likes"]
            state.value[index]["likes"] = likes + 1
            console.log("we are here")
            axios.post(`http://localhost:5000/blogs/${action.payload._id}/addLike`)
        },
        addBlogDislike:(state,action)=>{
            const index = state.value.findIndex(blog=>blog._id==action.payload._id)
            const dislikes = state.value[index]["dislikes"]
            state.value[index]["dislikes"] = dislikes + 1
            axios.post(`http://localhost:5000/blogs/${action.payload._id}/addDislike`)
        },
        editBlog:(state,action)=>{
            const index = state.value.findIndex(blog=>blog._id==action.payload._id)
            console.log(index,action.payload)
            state.value[index] = action.payload
            axios.put(`http://localhost:5000/blogs/updateBlog/${action.payload._id}`,action.payload)
        }
    }
})

export const {addBlog, deleteBlog, editBlog, setBlogs, addBlogDislike, addBlogLike} = blogs.actions;
export default blogs.reducer
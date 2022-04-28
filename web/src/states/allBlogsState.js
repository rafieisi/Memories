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
            let userID = action.payload.userID;
            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            newBlog["_id"] = genRanHex(24);
            newBlog["userID"] = userID;
            newBlog["likes"] = [];
            newBlog["dislikes"] = [];
            state.value.push(action.payload.blog)

            //add to the database
            axios.post("http://localhost:5000/blogs/newBlog",newBlog)
        },
        deleteBlog:(state,action)=>{
            state.value = state.value.filter(blog=>blog._id!=action.payload._id)
            axios.delete(`http://localhost:5000/blogs/deleteBlog/${action.payload._id}`)
        },
        addBlogLike:(state,action)=>{
            const index = state.value.findIndex(blog=>blog._id==action.payload.blog._id)
            const userID = action.payload.userID;
            let dislikes = [...state.value[index]["dislikes"]]
            let likes = [...state.value[index]["likes"]]

            if (!likes.includes(userID)){
                likes.push(userID)
            }

            if (dislikes.includes(userID)){
                let index = dislikes.indexOf(userID)
                dislikes.splice(index,1)
            }
            
            axios.post(`http://localhost:5000/blogs/${action.payload._id}/addLike/${action.payload.userID}`)
        },
        addBlogDislike:(state,action)=>{
            const index = state.value.findIndex(blog=>blog._id==action.payload.blog._id)
            const userID = action.payload.userID;
            let dislikes = [...state.value[index]["dislikes"]]
            let likes = [...state.value[index]["likes"]]

            if (!dislikes.includes(userID)){
                dislikes.push(userID)
            }

            if (likes.includes(userID)){
                let index = likes.indexOf(userID)
                likes.splice(index,1)
            }

            axios.post(`http://localhost:5000/blogs/${action.payload._id}/addDislike/${action.payload.userID}`)
        },
        editBlog:(state,action)=>{
            const index = state.value.findIndex(blog=>blog._id==action.payload._id)
            state.value[index] = action.payload
            axios.put(`http://localhost:5000/blogs/updateBlog/${action.payload._id}`,action.payload)
        }
    }
})

export const {addBlog, deleteBlog, editBlog, setBlogs, addBlogDislike, addBlogLike} = blogs.actions;
export default blogs.reducer
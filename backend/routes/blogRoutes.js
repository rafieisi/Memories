import express from 'express';
import { getAllBlogs, saveBlog, deleteBlog, updateBlog, addLike, addDislike } from '../controllers/blogController.js';


const app = express.Router();
app.get('/', getAllBlogs)
app.post('/newBlog', saveBlog)
app.delete('/deleteBlog/:_id',deleteBlog)
app.put('/updateBlog/:_id',updateBlog)
app.post('/:_id/addLike',addLike)
app.post('/:_id/addDislike',addDislike)


export default app
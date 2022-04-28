import express from 'express';
import { removeLike, removeDislike, getAllBlogs, saveBlog, deleteBlog, updateBlog, addLike, addDislike } from '../controllers/blogController.js';


const app = express.Router();
app.get('/', getAllBlogs)
app.post('/newBlog', saveBlog)
app.delete('/deleteBlog/:_id',deleteBlog)
app.put('/updateBlog/:_id',updateBlog)
app.post('/:_id/addLike/:userID',addLike)
app.post('/:_id/addDislike/:userID',addDislike)
app.post('/:_id/removeLike/:userID',removeLike)
app.post('/:_id/removeDislike/:userID',removeDislike)


export default app
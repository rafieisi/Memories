import express from 'express';
import { getNumberOfPages, getBlogs } from '../controllers/paginationController.js';

const app = express.Router();

app.get('/:searchTerm/getNumberOfPages',getNumberOfPages)
app.get('/:searchTerm/getPage/:pageNumber',getBlogs)

export default app
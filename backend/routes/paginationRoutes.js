import express from 'express';
import { getNumberOfPages, getBlogs, getNumberOfPersonalPages, getPersonalBlogs } from '../controllers/paginationController.js';
import {vertifyToken} from '../helpers/authentication.js'

const app = express.Router();

app.get('/:searchTerm/getNumberOfPages',getNumberOfPages)
app.get('/:searchTerm/getPage/:pageNumber',getBlogs)
app.get('/personal/:searchTerm/:userID/getNumberOfPages',getNumberOfPersonalPages)
app.get('/personal/:searchTerm/:userID/getPage/:pageNumber',getPersonalBlogs)

export default app
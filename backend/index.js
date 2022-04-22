import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import bodyParser from 'body-parser';
import blogRoutes from './routes/blogRoutes.js';
import paginationRoutes from './routes/paginationRoutes.js';
import authentication from './routes/authentication.js';
import cookieParser from 'cookie-parser';

const app = express()
const port = 5000
const mongooseURL = "mongodb+srv://rafieisi:Sr110115118@cluster0.k8q9v.mongodb.net/mydb?retryWrites=true&w=majority"

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())


//mongoose
mongoose.connect(mongooseURL)

app.use('/blogs', blogRoutes);
app.use('/pagination',paginationRoutes);
app.use('/authentication',authentication)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
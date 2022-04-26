import {React, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import UpdateBlogItems from '../components/updateBlogItems/updateBlogItems.js';
import {useDispatch} from 'react-redux';
import {editBlog, setBlogs} from '../states/allBlogsState';
import axios from 'axios';
import Header from '../components/header.js';

function EditBlog(props) {
  
  const params = useParams();
  const dispatch = useDispatch()
  const id  = params.id;
  const [selectedBlog, setSelectedBlog] = useState({})
  const [loading,setLoading] = useState(true)

  const getBlogs = async () => {
    await axios.get("http://localhost:5000/blogs").then(res=>{
      let blogs = res.data;
      setBlogs(blogs);
      setSelectedBlog(blogs.filter(blog=>blog._id==id)[0]);
      setLoading(false)
    })
  }

  useEffect(()=>{
    getBlogs()
  }, [])

  return (
    <div>
      <Header isGeneral={true} setSearchTerm={()=>{}}/>
      {loading?<h1>"loading..."</h1>:<UpdateBlogItems
          blog={selectedBlog}
          pageTitle={"Edit Blog"}
          action={(blog)=>{dispatch(editBlog(blog))}}
        />}
        
    </div>
  )
}

export default EditBlog
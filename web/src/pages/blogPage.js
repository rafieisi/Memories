import React from 'react';
import Image from 'react-bootstrap/Image';
import Blog from '../components/blogItems.js';
import {useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import Header from '../components/header.js';

function SingleBlog(props) {
  const params = useParams();
  const id  = params.id;
  const blogs = useSelector(state => state.blogs.value);
  const selectedBlog = blogs.filter(blog=>blog._id==id)[0]

  const blogImage = {
    maxWidth:"60%",
    borderRadius:"50px"
  }

  const blog = {
    width:"80%",
    margin:"auto",
    marginTop:"50px",

    "& a":{
      textDecoration:"none",
      color:"black"
    }
  }
  return (
    <div>
      <Header isGeneral={true} setSearchTerm={()=>{}}/>
      <div style={blog}>
        <Image src={selectedBlog.image} rounded style={blogImage}/>
        <Blog blog={selectedBlog} shortened={false}/>
      </div>
    </div>
  )
}

export default SingleBlog
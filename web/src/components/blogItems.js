import React from 'react';
import BlogControl from './blogController/blogControl.js';
import Likes from '../components/likes.js';

function blog(props) {
    const blog = props.blog;
    const shortened = props.shortened;
    const blogInformation = {
        padding:"10px 15px",
        paddingTop:"15px"
      }
    
    const blogTags = blog.tags.map(tag=><span>#{tag} </span>)

    return (
        <div>
            <div style={blogInformation}>
                <h2>{blog.title}</h2>
                <div style={{color:"grey"}}>{blogTags}</div>
                <BlogControl blog={blog} />
                <p>{shortened?blog.content.slice(0,200):blog.content}</p>
            </div>
            <Likes blog={blog}/>
        </div>
    )
}

export default blog
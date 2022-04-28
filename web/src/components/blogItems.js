import React, {useState} from 'react';
import BlogControl from './blogController/blogControl.js';
import Likes from '../components/likes.js';

export default function Blog(props) {
    const blog = props.blog;
    const shortened = props.shortened;
    const [user,setUser] = useState(props.user)
    const blogInformation = {
        padding:"10px 15px",
        paddingTop:"15px"
      }
    
    const blogTags = blog.tags.map(tag=><span>#{tag} </span>)

    let editControl;
    if(props.editable){
        editControl = <BlogControl blog={blog} userID={user._id}/>
    }
    return (
        <div>
            <div style={blogInformation}>
                <h2>{blog.title}</h2>
                <div style={{color:"grey"}}>{blogTags}</div>
                {editControl}
                <p>{shortened?blog.content.slice(0,200):blog.content}</p>
            </div>
            <Likes blog={blog} userID={user._id}/>
        </div>
    )
}

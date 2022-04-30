import react, {useEffect} from 'react';
import { useState } from 'react';
import BlogControl from '../components/blogController/blogControl';
import Likes from '../components/likes';
import modalStyle from './blogModel.module.scss';
import {useParams} from 'react-router-dom';
import axios from 'axios';


export default function BlogPage(props) {
  const [user,setUser] = useState(props.user);
  const [blog,setBlog] = useState({image:"",title:"",content:"", likes:[], dislikes:[]});
  const [loading, setLoading] = useState(true);
  const {blogID} = useParams();
  
  useEffect(()=>{
    async function dummy(){
      setLoading(true);
      let res = await axios.get(`/blogs/getBlog/${blogID}`)
      setBlog(res.data);
      setLoading(false);
    }
    dummy()
  },[])


  const blogInformation = {
      padding:"10px 15px",
      paddingTop:"15px"
    }
    
  

  let editControl;
  if(props.user && props.user.isLoggedIn && user._id==blog.userID){
      editControl = <BlogControl blog={blog} userID={user._id}  positionNormal={true}/>
  }

  let blogTags;
  if(!loading){
    blogTags = blog.tags.map(tag=><span>#{tag} </span>)
  }
  return (
    <div className={modalStyle.modalContainer}>
      <img src={blog.image} className={modalStyle.modalImage}/>
      <div style={blogInformation}>
        <h2>{blog.title}</h2>
        <div style={{color:"grey"}}>{blogTags}</div>
        {editControl} 
        <p>{blog.content}</p>
      </div>
      <Likes blog={blog} userID={user._id}/>
    </div>
  );
}
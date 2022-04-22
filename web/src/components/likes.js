import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {useDispatch} from 'react-redux';
import {addBlogLike,addBlogDislike} from "../states/allBlogsState.js";

export default function Likes(props) {
  const dispatch = useDispatch();
  const thumbButtonStyle = {
    backgroundColor:"transparent",
    border:"none",
    marginBottom:"15px"
  }
  return (
    <div>
      <button 
        style={thumbButtonStyle}
        onClick={()=>dispatch(addBlogLike(props.blog))}>
        <span>
          <ThumbUpIcon /> {props.blog.likes}
        </span>
      </button>
      <button 
        style={thumbButtonStyle}
        onClick={()=>dispatch(addBlogDislike(props.blog))}>
        <span>
          <ThumbDownIcon /> {props.blog.dislikes}
        </span>
      </button>
    </div>
  )
}
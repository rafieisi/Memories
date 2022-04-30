import React,{useState} from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {useDispatch} from 'react-redux';
import {addBlogLike,addBlogDislike} from "../states/allBlogsState.js";

export default function Likes(props) {
  const dispatch = useDispatch();
  const [likes,setLikes] = useState(props.blog.likes)
  const [dislikes,setDislikes] = useState(props.blog.dislikes)
  
  const thumbButtonStyle = {
    backgroundColor:"transparent",
    border:"none",
    marginBottom:"15px"
  }

  const handleLiking = () => {
    if(!props.userID)return
    if(!likes.includes(props.userID)){
      dispatch(addBlogLike({blog:props.blog, userID: props.userID}));
      setLikes(prevState => {
        let stateLikes = [...prevState];
        stateLikes.push(props.userID);
        return stateLikes
      })
    }

    if(dislikes.includes(props.userID)){
      setDislikes(prevState => {
        let stateDislikes = [...prevState];
        let index = stateDislikes.indexOf(props.userID)
        stateDislikes.splice(index,1)
        return stateDislikes
      })
    }
  }

  const handleDisliking = () => {
    if(!props.userID)return
    if(!dislikes.includes(props.userID)){
      setDislikes(prevState => {
        let stateDislikes = [...prevState];
        stateDislikes.push(props.userID);
        return stateDislikes
      })
    }

    if(likes.includes(props.userID)){
      dispatch(addBlogDislike({blog:props.blog, userID: props.userID}));
      setLikes(prevState => {
        let stateLikes = [...prevState];
        let index = stateLikes.indexOf(props.userID)
        stateLikes.splice(index,1)
        return stateLikes
      })
    }
  }

  return (
    <div>
      <button 
        style={thumbButtonStyle}
        onClick={handleLiking}>
        <span>
          <ThumbUpIcon /> {likes.length}
        </span>
      </button>
      <button 
        style={thumbButtonStyle}
        onClick={handleDisliking}>
        <span>
          <ThumbDownIcon /> {dislikes.length}
        </span>
      </button>
    </div>
  )
}
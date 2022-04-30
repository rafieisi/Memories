import React from 'react';
import {useDispatch } from 'react-redux'
import {deleteBlog} from '../../states/allBlogsState.js';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import blogControlStyles from './blogControl.module.scss';

function BlogControl(props) {
    const dispatch = useDispatch();

    const controlContainer = {
        marginBottom:"15px",
        position:"absolute",
        top:"3%",
        right: "3%"
    }

    const normalStyle = {margin:"5px"}

    const buttonControllerStyles = {
        backgroundColor: "white",
        border: "none",
        borderRadius:"100%",
        width:"40px",
        height:"40px",
        marginRight:"10px"
    }

    const blog = props.blog;
    return (
        <div style={props.positionNormal?normalStyle:controlContainer}>
            <button className={blogControlStyles.editButton} style={buttonControllerStyles}>
                <a href={`/${props.userID}/editblog/${blog._id}`}>
                    <BorderColorIcon />
                </a>
            </button>
            <button className={blogControlStyles.deleteButton} style={buttonControllerStyles} onClick={()=>dispatch(deleteBlog({_id:blog._id}))}>
                <a href="/">
                    <DeleteForeverIcon />
                </a>
            </button>
        </div>
    )
}

export default BlogControl
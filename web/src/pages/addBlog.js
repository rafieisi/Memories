import {React, useState} from 'react'
import UpdateBlogItems from '../components/updateBlogItems/updateBlogItems.js';
import {addBlog} from '../states/allBlogsState.js';
import {useDispatch} from 'react-redux';
import Header from '../components/header.js';
import { useParams } from 'react-router';

function AddBlog(props) {
    const dispatch = useDispatch();
    const userID = useParams()["userID"];
    return (
        <div>
            <Header isGeneral={true} setSearchTerm={()=>{}}/>
            <UpdateBlogItems
                blog={{title:"",content:"",image:"",tags:[]}}
                pageTitle={"Add Blog"}
                tags={[]}
                action={(blog)=>{
                    dispatch(addBlog({blog,userID:userID}));
                }}
            />
        </div>
    )
}

export default AddBlog
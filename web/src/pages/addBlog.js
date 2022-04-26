import {React, useState} from 'react'
import UpdateBlogItems from '../components/updateBlogItems/updateBlogItems.js';
import {addBlog} from '../states/allBlogsState.js';
import {useDispatch} from 'react-redux';
import Header from '../components/header.js';

function AddBlog(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <Header isGeneral={true} setSearchTerm={()=>{}}/>
            <UpdateBlogItems
                blog={{title:"",content:"",image:""}}
                pageTitle={"Add Blog"}
                tags={[]}
                action={(blog)=>dispatch(addBlog({blog}))}
            />
        </div>
    )
}

export default AddBlog
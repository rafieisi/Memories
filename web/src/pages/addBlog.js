import {React, useState} from 'react'
import UpdateBlogItems from '../components/updateBlogItems/updateBlogItems.js';
import {addBlog} from '../states/allBlogsState.js';
import {useDispatch} from 'react-redux';

function AddBlog(props) {
    const dispatch = useDispatch();

    return (
        <div>
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
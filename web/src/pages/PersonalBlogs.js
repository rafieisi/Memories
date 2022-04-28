import {React, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router';
import Blog from '../components/blogItems.js';
import {useEffect} from 'react';
import axios from "axios";
import {setBlogs} from '../states/allBlogsState.js';
import Pagination from '../components/pagination.js';
import { useNavigate } from 'react-router-dom';
import Loading from '../assets/loading.gif';
import Header from '../components/header.js';
import blogsStyle from './pages.module.scss';


export default function PersonalBlogs(props) {
  const dispatch = useDispatch();
  const blogs = useSelector(state=>state.blogs.value);
  const [pgNumber, setPgNumber] = useState(useParams()["pageNumber"]);
  const [total, setStateTotal] = useState(1)
  const [loading,setLoading]=useState(true);
  const [searchTerm, setSearch]=useState("all");
  const navigate = useNavigate()
  
  const blogsContainer = {
    display:"flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }

  const blogContainer = {
    display:"inline-block",
    width:"30%",
    minWidth:"350px",
    maxWidth:"500px",
    margin:"10px",
    borderRadius:"50px",
    overflow:"hidden",
    backgroundColor:"white",
    position:"relative",
    "& a":{
      textDecoration:"none",
      color:"black"
    }
  }

  const blogImage = {
    width:"100%",
    maxHeight:"150px",
    objectFit:"cover"
  }
  const params = useParams();

  async function getPrimaryData(search=searchTerm){
    setLoading(true);
    let userId = params["id"];
    let res = await axios.get(`http://localhost:5000/pagination/personal/${search}/${userId}/getNumberOfPages`)
    setStateTotal(res.data.count)

    res = await axios.get(`http://localhost:5000/pagination/personal/${search}/${userId}/getPage/${pgNumber}`)
    dispatch(setBlogs(res.data))
    setLoading(false);
  }

  useEffect(()=>{
    getPrimaryData()
  },[searchTerm])

  function changePage(event, value){
    navigate(`/personalBlogs/${props.user._id}/${value}`)
    window.location.reload()
  }

  let pageContent;
  if(loading){
    pageContent = <div>
                    <img src={Loading} width={400} height={400}/>
                  </div>
  }else{
    pageContent = <div>
                    <div style={{justifyContent:"left"}}>
                      {blogs.map(blog=>{
                        return <div className={blogsStyle.blogContainer}>
                          <img src={blog.image} className={blogsStyle.blogImage}/>
                          <Blog blog={blog} shortened={true} editable={true} user={props.user}/>
                        </div>
                      })}
                    </div>
                    <Pagination numberOfPages={total} pageNumber={parseInt(pgNumber)} changePage={changePage}/>
                  </div>
  }

  return (
    <div>
      <Header setSearchTerm={setSearch} isGeneral={false} key={searchTerm} user={props.user}/>
      <div className={blogsStyle.blogsContainer}>
        {pageContent}
      </div>
    </div>
  )
}
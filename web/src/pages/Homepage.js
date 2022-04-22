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


export default function Hompage() {
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

  async function getPrimaryData(search=searchTerm){
    setLoading(true);
    let res = await axios.get(`http://localhost:5000/pagination/${search}/getNumberOfPages`)
    setStateTotal(res.data.count)

    res = await axios.get(`http://localhost:5000/pagination/${search}/getPage/${pgNumber}`)
    dispatch(setBlogs(res.data))
    setLoading(false);
  }

  const setSearchTerm = (search) => {
    setSearch(search)
    getPrimaryData(search)
  }

  useEffect(()=>{
    getPrimaryData()
  },[])

  function changePage(event, value){
    navigate(`/blogs/${value}`)
    window.location.reload()
  }

  let pageContent;
  if(loading){
    pageContent = <div>
                    <img src={Loading} width={400} height={400}/>
                  </div>
  }else{
    pageContent = <div>
                    <div>
                      {blogs.map(blog=>{
                        return <div style={blogContainer}>
                          <img src={blog.image} style={blogImage}/>
                          <Blog blog={blog} shortened={true}/>
                        </div>
                      })}
                    </div>
                    <Pagination numberOfPages={total} pageNumber={parseInt(pgNumber)} changePage={changePage}/>
                  </div>
  }

  return (
    <div style={blogsContainer}>
      {pageContent}
    </div>
  )
}
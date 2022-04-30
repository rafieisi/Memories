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
import blogsStyle from './pages.module.scss';
import SearchBar from '../components/searchBar/searchBar.js';
import { useSearchParams } from "react-router-dom";


export default function Hompage(props) {
  const dispatch = useDispatch();
  const blogs = useSelector(state=>state.blogs.value);
  const [pgNumber, setPgNumber] = useState(useParams()["pageNumber"]);
  const [total, setStateTotal] = useState(1)
  const [loading,setLoading]=useState(true);
  let [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearch]=useState(searchParams.get("searchTerm")||"all");
  const navigate = useNavigate();


  async function getPrimaryData(search=searchTerm){
    setLoading(true);
    let res = await axios.get(`http://localhost:5000/pagination/${search}/getNumberOfPages`)
    setStateTotal(res.data.count)

    res = await axios.get(`http://localhost:5000/pagination/${search}/getPage/${pgNumber}`)
    dispatch(setBlogs(res.data))
    setLoading(false);
  }

  useEffect(()=>{
    getPrimaryData()
  },[searchTerm])

  function changePage(event, value, term="all"){
    navigate(`/blogs/${value}?searchTerm=${term}`)
    window.location.reload()
  }


  const setSearchTerm = (term) => {
    changePage(null,1,term)
  }

  let pageContent;
  if(loading){
    pageContent = <div>
                    <img src={Loading} width={400} height={400}/>
                  </div>
  }else{
    pageContent = <div style={{margin:"auto",textAlign:"center"}}>
                    <div>
                      {blogs.map(blog=>{
                        return <div className={blogsStyle.blogContainer} onClick={()=>{navigate(`/blog/${blog._id}`)}}>
                          <img src={blog.image} className={blogsStyle.blogImage}/>
                          <Blog blog={blog} shortened={true} editable={false} user={props.user}/>
                        </div>
                      })}
                    </div>
                    <Pagination numberOfPages={total} pageNumber={parseInt(pgNumber)} changePage={changePage}/>
                  </div>
  }

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} key={searchTerm}/>
      <div className={blogsStyle.blogsContainer}>
        {pageContent}
      </div>
    </div>
  )
}
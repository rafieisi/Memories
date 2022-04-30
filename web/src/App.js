import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './App.css';
import Homepage from './pages/Homepage.js';
import EditBlog from './pages/editBlog.js';
import AddBlog from './pages/addBlog.js';
import Register from './pages/register/register.js';
import Login from './pages/login/login.js';
import PersonalBlogs from "./pages/PersonalBlogs";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {login, logout, logOut} from './states/userState.js';
import Header from "./components/header";
import {useDispatch} from 'react-redux';
import BlogPage from './pages/blogPage.js';
import BlogsPage from './pages/blogsPage.js';


function App() {
  const dispatch = useDispatch();
  const [user,setUser] = useState(useSelector(state=>state.user))
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    if(user.isLoggedIn == false && Cookies.get("userToken")){
      setUser(login())
    }
    
    if(user.isLoggedIn == true && !(Cookies.get("userToken"))){
      setUser(logout())
    }
  },[loading,user])
 
  const logOutUser = () => {
    setLoading(true)
    Cookies.remove("userToken")
    dispatch(logOut())
    setUser(logout())
    setLoading(false)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} logOutUser={logOutUser}/>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs/1"/>}/>
          <Route path="/blogs/:pageNumber" element={<BlogsPage user={user} setLoading={setLoading} baseURL={'http://localhost:5000/pagination'} navigateURL={'/blogs'} isPersonal={false}/>}/>
          <Route path="/personalBlogs/:id/:pageNumber" element={<BlogsPage user={user} setLoading={setLoading} baseURL={'http://localhost:5000/pagination/personal'} navigateURL={`/personalBlogs/${user._id}`} isPersonal={true}/>}/>
          <Route path="/:userID/addblog" element={<AddBlog/>}/>
          <Route path="/:userID/editblog/:id" element={<EditBlog/>}/>
          <Route path="/blog/:blogID" element={<BlogPage user={user} setLoading={setLoading}/>}/>
          <Route path="/register" element={<Register setLoading={setLoading}/>}/>
          <Route path="/login" element={<Login setLoading={setLoading}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

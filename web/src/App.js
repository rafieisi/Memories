import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './App.css';
import Homepage from './pages/Homepage.js';
import EditBlog from './pages/editBlog.js';
import AddBlog from './pages/addBlog.js';
import Blog from './pages/blogPage.js';
import Register from './pages/register/register.js';
import Login from './pages/login/login.js';
import PersonalBlogs from "./pages/PersonalBlogs";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {login, logout} from './states/userState.js';


function App() {
  const [user,setUser] = useState(useSelector(state=>state.user))

  useEffect(()=>{
    if(user.isLoggedIn == false && Cookies.get("userToken")){
      setUser(login())
    }
    
    if(user.isLoggedIn == true && !(Cookies.get("userToken"))){
      setUser(logout())
    }
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs/1"/>}/>
          <Route path="/blogs/:pageNumber" element={<Homepage user={user}/>}/>
          <Route path="/personalBlogs/:id/:pageNumber" element={<PersonalBlogs user={user}/>}/>
          <Route path="/:userID/addblog" element={<AddBlog/>}/>
          <Route path="/:userID/editblog/:id" element={<EditBlog/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

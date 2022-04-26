import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import Homepage from './pages/Homepage.js';
import EditBlog from './pages/editBlog.js';
import AddBlog from './pages/addBlog.js';
import Blog from './pages/blogPage.js';
import Register from './pages/register/register.js';
import Login from './pages/login/login.js';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs/1"/>}/>
          <Route path="/blogs/:pageNumber" element={<Homepage/>}/>
          <Route path="/addblog" element={<AddBlog/>}/>
          <Route path="/editblog/:id" element={<EditBlog/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

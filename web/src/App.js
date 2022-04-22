import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import Homepage from './pages/Homepage.js';
import EditBlog from './pages/editBlog.js';
import AddBlog from './pages/addBlog.js';
import Blog from './pages/blogPage.js';
import Register from './pages/register/register.js';
import Login from './pages/login/login.js';
import Header from './components/header.js';


function App() {
  const [searchTerm,setSearchTerm] = useState("all")
  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs/1"/>}/>
          <Route path="/blogs/:pageNumber" element={<Homepage searchTerm={searchTerm}/>}/>
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

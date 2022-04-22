import React from 'react';
import Logo from '../assets/logo.jpg';
import SearchBar from '../components/searchBar/searchBar.js';

export default function header(props) {
    const header = {
        backgroundColor:"white",
        padding:"10px",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around",
        width:"100%"
      }
    
      const headerLogo = {
        width:"300px",
        marginLeft:"-10%"
      }
    
      const headerButton = {
        textDecoration:"none",
        color:"black",
        border:"1px solid black",
        padding:"7px 14px",
        borderRadius:"15px",
    
        "&:hover":{
          backgroundColor:"black",
          color:"white",
          borderColor:"white"
        }
      }
  return (
    <div style={header}>
        <img style={headerLogo} src={Logo}/>
        <SearchBar setSearchTerm={props.setSearchTerm}/>
        <a style={headerButton} href="/addBlog"><b>+</b> Add</a>
    </div>
  )
}

import React from 'react';
import Logo from '../assets/logo.jpg';
import SearchBar from '../components/searchBar/searchBar.js';
import {useSelector, useDispatch} from 'react-redux';
import { logOut } from '../states/userState';


export default function Header(props) {
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
        marginRight:"10px",
    
        "&:hover":{
          backgroundColor:"black",
          color:"white",
          borderColor:"white"
        }
      }

      const userImage = {
        width:"50px",
        height:"50px",
        borderRadius:"100px",
        border:"1px solid black",
        padding:"2px"
      }

      const userUsername = {
        display: "inline-block",
        fontSize:"95%",
        padding:"5px",
        marginRight:"25px"
      }

    const dispatch = useDispatch();
    const user = useSelector(state=>state.user)

    const logout = () => {
      dispatch(logOut())
    }
  
  let buttons = <span>
                  <a style={headerButton} href="/login">Login</a>
                </span>
  if(user.isLoggedIn){
    buttons = <span>
                <span>
                  <img src={user.profilePicture} style={userImage}/>
                  <h3 style={userUsername}>{user.username}</h3>
                </span>
                <a style={headerButton} href="/addBlog"><b>+</b> Add</a>
                <a style={headerButton} href="/" onClick={logout}>Log Out</a>
              </span>
  }

  let general;
  if(!props.isGeneral){
    general = <span>
      <SearchBar setSearchTerm={props.setSearchTerm}/>
        {buttons}
    </span>
  }

  return (
    <div style={header}>
        <img style={headerLogo} src={Logo}/>
        {general}
    </div>
  )
}

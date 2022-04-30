import React,{useState,useEffect} from 'react';
import Logo from '../assets/logo.jpg';
import Dropdown from './dropdown';
import { useNavigate } from 'react-router';
import { logOut } from '../states/userState';


export default function Header(props) {
    let navigate = useNavigate();
    const header = {
        backgroundColor:"white",
        padding:"10px",
        display:"flex",
        alignItems:"center",
        justifyContent:"right",
        position:"relative",
        paddingLeft:"3%",
        paddingRight:"3%"
      }
    
      const headerLogo = {
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        maxWidth:"350px",
        cursor: "pointer"
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

      const loginButton ={
        display:"flex",
        height:"50px",
        alignItems:"center",
        justifyContent:"center"
      }

  
  let buttons = <span style={loginButton}>
      <a style={headerButton} href="/login">Login</a>
    </span>

  if(props.user && props.user.isLoggedIn){
    buttons = <Dropdown user={props.user} logOutUser={props.logOutUser}/>
  }

  return (
    <div style={header}>
      <img style={headerLogo} src={Logo} onClick={()=>navigate("/",{replace:true})}/>
      {buttons}
    </div>
  )
}

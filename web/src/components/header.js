import React,{useState,useEffect} from 'react';
import Logo from '../assets/logo.jpg';
import SearchBar from '../components/searchBar/searchBar.js';
import Dropdown from './dropdown';
import { useNavigate } from 'react-router';


export default function Header(props) {
    const [user,setUser] = useState(props.user)
    let navigate = useNavigate();
    const header = {
        backgroundColor:"white",
        padding:"10px",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
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

  
  let buttons;
  
  if(!props.isGeneral){
    buttons = <span>
      <a style={headerButton} href="/login">Login</a>
    </span>
  }

  if(user && user.isLoggedIn){
    buttons = <Dropdown user={user}/>
  }

  let general;
  if(!props.isGeneral){
    general = <SearchBar setSearchTerm={props.setSearchTerm}/>
  }

  return (
    <div style={header}>
      <img style={headerLogo} src={Logo} onClick={()=>navigate("/",{replace:true})}/>
      {general}
      {buttons}
    </div>
  )
}

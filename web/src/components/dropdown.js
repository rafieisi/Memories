import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function Dropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    marginLeft:"15px",
    fontWeight:"bold",
    marginBottom: "0px",
    color:"black"
  }

  const userButton = {
    backgroundColor:"transparent",
    border:"none",
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    color:"black"
  }

  const logout = () => {
    props.logOutUser();
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={userButton}
      >
          <img src={props.user.profilePicture} style={userImage}/>
          <h3 style={userUsername}>{props.user.username}</h3>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={`/personalBlogs/${props.user._id}/1?searchTerm=all`} 
                  onClick={()=>{window.location.href = `/personalBlogs/${props.user._id}/1?searchTerm=all`;}}>
          <PersonOutlineIcon />
          Personal Blogs
        </MenuItem>
        <MenuItem component={Link} to={`/${props.user._id}/addblog`} >
          <AddIcon />
          Add Blog
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem component={Link} to={"/"} onClick={logout} >
          <LogoutIcon />
          Logout
        </MenuItem>

      </StyledMenu>
    </div>
  );
}
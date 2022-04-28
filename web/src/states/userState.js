import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const parseJWTCookie = () => {
    let jwtCookie = Cookies.get("userToken");
    let decodedJWT = false;
    try{
        decodedJWT = jwt_decode(jwtCookie)
    }catch(error){
        console.log("failed to decode the jwt cookie: ", error);
    }
    return decodedJWT
}

export const logout = () => {
    Cookies.remove("userToken");
    return {isLoggedIn: false, username:"", _id:"", profilePicture:""}
}

export const login = () => {
    let decodedJWT = parseJWTCookie()
    if(decodedJWT){
        return {...decodedJWT, isLoggedIn:true}
    }else{
        return logout()
    }
}


const userSlice = createSlice({
  name: 'user',
  initialState:login(),//should contain name, profile picture and user id
  reducers: {
      logIn:(state,action)=>{
          state = login()
      },
      logOut:(state,action)=>{
          state = logout()
      }
  },
})

export const { logIn, logOut } = userSlice.actions
export default userSlice.reducer
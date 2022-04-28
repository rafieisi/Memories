import bcrypt from 'bcrypt';
import express from 'express';
import userModel from '../schemas/userSchema.js';
import JWT from 'jsonwebtoken';

export const createToken = (user) => {
    const token = JWT.sign({username:user.username, _id:user._id, profilePicture:user.profilePicture},"sinawashere")
    return token;
}

export const vertifyToken = (req,res,next) => {
    const userToken = req.cookies['userToken'];
    if(!userToken){
        res.status(400).send("pleased authenticate")
    }

    try{
        JWT.verify(userToken,"sinawashere", (err,decoded)=>{
            if(err){
                res.status(400).json("failed to authenticate");
            }else if(decoded){
                next();
            }
        })
    }catch(error){
        res.status(400).send("authentication error")
    }
    return;
}

export const getUserId = (req)=>{
    const userToken = req.cookies["userToken"]
    const userID = JWT.decode(userToken);
    return userID
}

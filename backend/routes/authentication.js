import bcrypt from 'bcrypt';
import express from 'express';
import userModel from '../schemas/userSchema.js';
import { createToken } from '../helpers/authentication.js';


const saltRounds = 10;
const app = express.Router();

const checkRegistration = async (req,res,next) => {
    const user = req.body;

    //check to see if we have values in our attributes
    if(user.username.length == 0 || user.password.length == 0 || user.profilePicture.length == 0){
        res.status(400).json("failed to created user")
        return
    }

    //check if the username exists
    const username = await userModel.find({username:user.username})
    if(username.length != 0){
        res.status(400).json("username exists")
        return
    }
    next();
}

const checkLogin = async (req,res,next) => {
    const user = req.body;

    //check to see if we have values in our attributes
    if(user.username.length == 0 || user.password.length == 0){
        res.status(400).json("failed to created user")
        return
    }

    //check if the username exists
    const username = await userModel.find({username:user.username})
    if(username.length == 0){
        res.status(400).json("username does not exists")
        return
    }
    next();
}


app.post('/register', checkRegistration, (req,res)=>{
    let user = {"password":req.body.password, "username":req.body.username, "profilePicture": req.body.profilePicture};
    bcrypt.hash(user.password, saltRounds, async (err,hash)=>{
        if(!err){
            //create the user in the mongodb
            user.password = hash
            let newUser = await userModel.create(user)
            if(newUser){
                const token = createToken(user);
                res.cookie("userToken",token,{maxAge:60*60*1000})
            }
        }else{
            res.status(400).json("failed to created user")
        }
    })
    res.json("user added!")
})

app.post('/login',checkLogin,async (req,res)=>{
    console.log("login",req.body)
    const user = (await userModel.find({username:req.body.username}))[0];
    bcrypt.compare(req.body.password, user.password, (err, data)=>{
        if(data){
            const token = createToken(user);
            res.cookie("userToken",token,{maxAge:60*60*1000})
            res.status(200).send("logged in!");
            return;
        }else{
            res.status(400).send("username or password is incorrect");
            return;
        }
    })

})


export default app
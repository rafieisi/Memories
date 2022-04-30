import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    profilePicture:String,
    userID: Number
})

const userModel = mongoose.model("user",userSchema)
export default userModel;
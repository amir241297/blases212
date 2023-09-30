const mongoose=require("mongoose")
const userAccountSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String 
})
const UserAccountModel=mongoose.model("User_SignUp",userAccountSchema)
module.exports={
    UserAccountModel
} 
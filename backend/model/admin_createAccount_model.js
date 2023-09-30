const mongoose=require("mongoose")
const adminAccountSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String 
})
const AdminAccountModel=mongoose.model("Admin_SignUp",adminAccountSchema)
module.exports={AdminAccountModel}
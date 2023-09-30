const mongoose=require("mongoose") 

const adminSchema=mongoose.Schema({
    name:String, 
    description:String,
    price:Number,
    image:String
})
const AdminModel=mongoose.model("productData",adminSchema)
module.exports={
    AdminModel
}
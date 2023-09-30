const express= require("express")
const app=express()
const {adminRoutes}=require("./Route/adminRoutes")
const { userRoutes } = require("./Route/userRoutes")
const {connection}=require("./config/db")
require("dotenv").config({path:"./config/.env"})
const cors=require("cors")
app.use(cors())


app.use("/admin",adminRoutes)
app.use("/user",userRoutes) 

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server is Connected to DB")  
    }catch(err){
        console.log("Error while connecting to DB",err)
    }
    console.log(`App is running on Port ${process.env.port}`)
})   
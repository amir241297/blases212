const express = require('express')
const adminRoutes = express()
const { AdminModel } = require("../model/admin_model")
const { AdminAccountModel } = require("../model/admin_createAccount_model")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

adminRoutes.use(express.json())


adminRoutes.get("/", async(req, res) => {
    res.send({Status:"Admin Home"})
    console.log("Admin Home")
})
adminRoutes.get("/productsData", async(req, res) => {
    try{
        let data=await AdminModel.find()
        res.send(data)
    }catch(err){
        res.send(err)
        console.log("Error while fetching data to DB",err)
    }
})
adminRoutes.post("/addData", async (req, res) => {
    const data = req.body
    // res.send(req.body)
    // console.log(req.body)
    try {
        let admin = new AdminModel(data)
        await admin.save()
        console.log("Data has been into DB")
        res.send(admin)
    } catch (err) {
        res.send(err)
        console.log("Something went wrong while adding Data into BD", err)
    }
})

adminRoutes.patch("/editData/:_id", async (req, res) => {
    
    const _id = req.params._id
    const payload = req.body
    // res.send(payload) 
    // console.log(payload)
    // console.log(_id)
    try {
        await AdminModel.findByIdAndUpdate({ _id }, payload)
        console.log("Data Updated")
        res.send({status:"Data Updated"})
    } catch (err) {
        console.log("Error While Updating", err)
        res.send({err})
    }
})

adminRoutes.delete("/deleteData/:_id", async (req, res) => {
    const _id = req.params._id
    // res.send(_id)
    // console.log(_id)
    try {
        await AdminModel.findByIdAndDelete({_id})
        console.log("Data Deleted!")
        res.send({status:"Deleted"})
    } catch (err) {
        res.send(err)
        console.log("Error While Deleting Data!", err)
    }
})
// Admin Authentication
adminRoutes.post("/adminRegistration", async (req, res) => {
    let { name, email, password } = req.body
//    res.send(req.body)
//    console.log(req.body)
    try {
        bcrypt.hash(password, 5, async(err, secure_password) => {
            if (err) {
                console.log("error while hashing", err)
                res.send(err)
            } else {

                let signup=new AdminAccountModel({name,email,password:secure_password})
                await signup.save()
                res.send({status:"Admin Account Created Successfull!"})
                console.log("Admin Account Created")
            }
        });

    } catch (err) {
        console.log("Error While Admin Sign up!", err)
    } 
}) 
adminRoutes.post("/adminLogin", async(req, res) => {
    let {email, password } = req.body
    const data=await AdminAccountModel.find({email})
    // res.send(data[0].password)
    try{
        if(data.length>0){
            bcrypt.compare(password,data[0].password,(err,result)=>{
                if(err){
                    res.send({"error while compare log in, line:77":err})
                    console.log("error while compare log in, line:77",err)
                }else{
                    const token = jwt.sign({ User_Type: 'Admin' }, 'Authentication')
                    console.log({ "response": "Admin Login Successfull!", "token": token })
                    res.send({ "response": "Admin", "token": token })
                }
            })
        }else{
            res.send({"Status":"Wrong Credentials!"})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = { adminRoutes }
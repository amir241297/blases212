const express=require ("express")
const userRoutes=express()
const becrypt=require("bcrypt")
const {UserAccountModel}=require("../model/user_creteAccount_model")
const jwt=require("jsonwebtoken")
userRoutes.use(express.json())

userRoutes.get("/",(req,res)=>{
    res.send("User Home") 
    console.log("User Home")
})
userRoutes.post("/createAccount",(req,res)=>{
    let {name,email,password}= req.body
    // console.log(req.body)
    // res.send(req.body)
    try{
        becrypt.hash(password,5,async(err,secure_password)=>{
            if(err){
                res.send(err)
                console.log(err)
            }else{
                let signup=new UserAccountModel({name,email,password:secure_password})
                await signup.save()
                res.send({status:"User Created Account Successfull!"})
                console.log("User Created Account Successfull!",secure_password)
            } 
        })
    }catch(err){
        res.send(err)
        console.log("Error while creating user account!",err)
    }
})
userRoutes.post("/userlogin",async(req,res)=>{
    let {email,password}=req.body
    let data=await UserAccountModel.find({email})
    try{ 
        if(data.length>0){
            becrypt.compare(password,data[0].password,(err,result)=>{
                if(err){
                    console.log("Error While User Login!")
                    res.send({"Not Valid":err})
                }else{
                    const token=jwt.sign({User_Type:"User"},"Authentication")
                    res.send({"res":"user login successfull!", "token":token})
                    console.log({"res":"user login successfull!", "token":token})
                }
            }) 
        }else{
            res.send({"status":"Wrong Credentials!"})
        }
    }catch(err){
        console.log("line number:47",err)
        
    }
})

module.exports={userRoutes}
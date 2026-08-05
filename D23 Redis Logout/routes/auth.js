const express = require('express');
const authRouter = express.Router();
const User = require("../Models/Users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validUser = require("../utils/validateUser");

authRouter.post("/register" , async(req,res)=>{
    try {
        const data = req.body;
        validUser(data); 
        req.body.password = await bcrypt.hash(data.password,10);
        await User.create(data);
        res.status(200).send("User registered Successfully !")
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

authRouter.post("/login" , async(req,res)=>{
    try {
        const people =await User.findOne({emailId:req.body.emailId});
        // if(!(req.body.emailId === people.emailId)){
        //     throw new Error("Invalid Credentials");
        // }
        const isAllowed = people.verifyPassword(req.body.password);

        if(!isAllowed){
            throw new Error("I nvalid Credentials");
        }

        //jwt token 
        const token = people.getJWT();


        res.cookie("token",token)
        res.status(200).send("User login Successfully !")
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token","fdggkjhgdhgffj");
        res.status(200).send("Logout successfully");
    }catch(err){
        res.send("Error : "+ err.message);
    }
})

module.exports = authRouter;
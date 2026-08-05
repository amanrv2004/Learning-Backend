 const { Auth } = require("./middleware/auth")
const express = require("express");
const app = express();
const main = require("./database")
const validUser = require("./utils/validateUser")
const User = require("./Models/Users")
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser())

app.post("/register" , async(req,res)=>{
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

app.post("/login" , async(req,res)=>{
    try {
        const people =await User.findOne({emailId:req.body.emailId});
        // if(!(req.body.emailId === people.emailId)){
        //     throw new Error("Invalid Credentials");
        // }
        const isAllowed = await bcrypt.compare(req.body.password,people.password);

        if(!isAllowed){
            throw new Error("Invalid Credentials");
        }

        //jwt token 
        const token = jwt.sign({ _id:people._id , emailId:people.emailId}, 'Aman1321',{expiresIn:10});


        res.cookie("token",token)
        res.status(200).send("User login Successfully !")
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.get("/info" , async(req,res)=>{
    try {
        //validate the user 
        const payload = jwt.verify(req.cookies.token,"Aman1321")
        const ans = await User.find();
        console.log(req.cookies);
        console.log(payload);
        

        res.status(200).send(ans);
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.get("/user" , async(req,res)=>{
    try {

        //
        const payload = jwt.verify(req.cookies.token,"Aman1321")
        const ans = await User.findById(payload._id);
        res.status(200).send(ans);
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.delete("/user/:id" , async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted Successfully ");
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.patch("/user" , async(req,res)=>{
    try {
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update);
        res.status(200).send(" Updated Successfully Successfully ");
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})


main()
    .then(async () => {
        console.log("Connected to DB");
        app.listen(3000, () => {
            console.log(`http://localhost:3000`);
        })
          const result = await User.find({name:"Aman"});
          console.log(result);
    })
    .catch((err) => console.log(err));



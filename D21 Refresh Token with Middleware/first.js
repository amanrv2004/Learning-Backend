const {userAuth}  = require("./middleware/userAuth")
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
        const token = jwt.sign({ _id:people._id , emailId:people.emailId}, 'Aman1321',{expiresIn:'1d'});


        res.cookie("token",token)
        res.status(200).send("User login Successfully !")
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.get("/user" , userAuth, async(req,res)=>{
    try {
        res.status(200).send(req.ans);
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.delete("/user/:id" , userAuth ,async(req,res)=>{
    try {
        //authenticate user :Token validate

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



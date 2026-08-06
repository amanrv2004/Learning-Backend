const {userAuth}  = require("./middleware/userAuth")
const express = require("express");
const app = express();
const main = require("./database")
const validUser = require("./utils/validateUser")
const User = require("./Models/Users")
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const authRouter = require('./routes/auth')
const userRoute = require('./routes/user')
const redisClient = require("./config/redis")
app.use(express.json());
app.use(cookieParser())

app.use('/auth',authRouter);
app.use('/user',userRoute);

const InitlizeConnection = async ()=>{
    try{

        await Promise.all([redisClient.connect(),main()]);
        console.log("Connected to Redis");
        console.log("Connected to MongoDB");
        
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`);
        })
    }
    catch(err){
        console.log("Error " + err.message)
    }
}

InitlizeConnection();


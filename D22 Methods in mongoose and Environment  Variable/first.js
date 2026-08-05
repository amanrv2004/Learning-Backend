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

app.use(express.json());
app.use(cookieParser())

app.use('/auth',authRouter);
app.use('/user',userRoute);


main()
    .then(async () => {
        console.log("Connected to DB");
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`);
        })
          const result = await User.find({name:"Aman"});
          console.log(result);
    })
    .catch((err) => console.log(err));



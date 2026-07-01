
const express = require("express");

const app = express();

// app.use((req,res)=>{
//     res.send({
//         name:"Aman",
//         age:23,
//         gender:"male",
//         money:200000,
//         Account:12345678
//     })
// });


app.use("/about",(req,res)=>{
    res.send("I am Your About Page")
})
app.use("/detail",(req,res)=>{
    res.send("I am Your Detail Page")
})

app.use("/",(req,res)=>{
   res.send("Welcome to Home Page")
})




app.listen(4000,()=>{
    console.log(`http://localhost:4000`);
})
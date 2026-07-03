
const express = require("express");

const app = express();

const BookStore = [
    {id:1,name:"Harry Potter",author:"DevFlus"},
    {id:2,name:"Friends",author:"Vikas"},
    {id:3,name:"Nexus",author:"Rohit"},
    {id:4,name:"DSA",author:"Maharaj"},
    {id:5,name:"Web Dev",author:"Negi"}
]

app.use(express.json());

app.get("/book",(req,res)=>{
    res.send(BookStore);
})

app.get("/book/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const Book =  BookStore.find(info=> info.id === id)
    res.send(Book);
})

app.post("/book",(req,res)=>{
    BookStore.push(req.body);
    res.send("Data Saved Successfully");
})

app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})










// // app.use("/user",(req,res)=>{
// //     res.send("Hello Coder Army")
// // })


// //get  

// // parsing 

// app.use(express.json());

// app.get("/user",(req,res)=>{
//     // console.log(req);
//     res.send({name:"Aman"})

// })

// app.post("/user",(req,res)=>{
//     // console.log("Data send Successfully");
//     console.log(typeof req.body.age);
//     res.send("Data Saved Successfully");
// })
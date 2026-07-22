const mongoose = require('mongoose')

async function main() {
  mongoose.connect('mongodb+srv://webpixellibrary_db_user:Qwert12345@cluster0.nrmzxfr.mongodb.net/LearnBackend?appName=Cluster0');

  //create schema
  // const userSchema = new Schema({
  //   name:String,
  //   age:Number,
  //   city:String,
  //   gender:String
  // })

  //model create : collection create karna : table ko create karna  : class create karna 

  // const User = mongoose.model("user",userSchema);


  // // document create or object create
  // const user1 = new User({name:"Aman",age:20,city:"Delhi",gender:"Male"})
  // await user1.save();  //save 

  // //another method  to create and save 
  // await User.create({name:"Raj",age:22,city:"Delhi",gender:"Male"})

  // //another 
  // await User.insertMany([{name:"Verma",age:21,city:"Delhi",gender:"Male"},{name:"Abhay",age:21,gender:"Male"}]);


  // const ans = await User.find({});
  // console.log(ans);

  //find document bu particular field 

  // const result = await User.find({name:"Rohit"});
  // console.log(result);
}

// main()
// .then(()=>{
//   console.log("Connected to DB");
// })
// .catch((err)=> console.log(err));

module.exports = main;
const mongoose = require('mongoose')
const {Schema} = require('mongoose')


const userSchema = new Schema({
    name:String,
    age:Number,
    city:String,
    gender:String
})

const User = mongoose.model("user",userSchema);

module.exports = User;
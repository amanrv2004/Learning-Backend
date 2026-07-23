const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
        min: 14,
        max: 70
    },
    gender: {
        type: String,
        // enum:["Male","Female","others"]
        validate(value) {
            if (!["Male", "Female", "others"].includes(value))
                throw new Error("Invalid Gender")
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable:true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "1.png"
    },

},
    {
        timestamps: true
    })

const User = mongoose.model("user", userSchema);

module.exports = User;
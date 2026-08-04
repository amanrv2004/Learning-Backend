const validator = require('validator')

function validUser(data) {

    const mandatory = ["firstName", "emailId", "age", "password"];
    const userKeys = Object.keys(data);
    const isAllowed = mandatory.every((k) => userKeys.includes(k));
    if (!isAllowed)
        throw new Error("Fields Missing");

    //password vaidation

    if(!validator.isEmail(data.emailId)){
        throw new Error("Enter Valid Email ID . You Entered the invalid Email Id");
    }
    
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Enter the Strong Password");
    }

    if(!(data.firstName.length>=3 && data.firstName.length<=20)){
        throw new Error("Name should have atleast 3 charater and atmost 20 charater");
    }

    //first name >3 max > 20
    // valid email id

}

module.exports = validUser;
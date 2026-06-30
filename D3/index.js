const fs = require('fs');
let a =10 ;
let b = "Hello Ji ";
console.log(b);
function sum(a,b){
    return a+b;
}

setTimeout(()=>{
    console.log("hello TimeOut");
},1000);

console.log(a)
console.log(sum(2,3))



fs.readFile("./data.json","utf-8",(err,res)=>{
    console.log(res);
})

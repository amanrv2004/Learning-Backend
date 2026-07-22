const Auth = (req,res,next)=>{
    const token = "ABCDEF";
    const Access = token === 'ABCDEF';
    if(!Access){
        res.status(403).send("No Permission");
    }
    next();
}

module.exports = {Auth}
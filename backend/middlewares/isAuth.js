const jwt=require('jsonwebtoken')

const isAuth = (req,res,next)=>{
    // console.log(req.headers);
    //!get token from the header
    const headerobj= req.headers;
    const token = headerobj?.authorization?.split(' ')[1];
    // console.log(token);
    const verifyToken = jwt.verify(token,'ExpensesKey',(err,decoded)=>{
        console.log(decoded);
        if (err) {
            return false
        }else{
            return decoded
        }
    });
    if (verifyToken) {
        //!save the user req obj
        req.user = verifyToken.id
        next();
    }else{
        const err= new Error("Token expired, login again");
        next(err)
    }
    
}
module.exports= isAuth;
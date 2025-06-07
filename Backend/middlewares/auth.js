const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        if(!token) {
            return res.status(400).send("No token .. Please login Again!");
        }
        const verifytoken=jwt.verify(token,process.env.JWT_SECRET);
        if(!verifytoken) return res.status(401).send("Invalid token!!");
        req.user=verifytoken;
        next();

    } catch(err){
        res.status(401).json({
            status:"false",
            message:"Unauthorized Access"
        })
    }
}

module.exports=verifyToken;

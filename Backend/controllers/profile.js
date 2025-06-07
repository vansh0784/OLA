const driver = require("../models/driver.model");
const user = require("../models/user.model");

const profile=async(req,res)=>{
    try{
        const data=req.user;
        if(!data){
            return res.status(400).send("Login Again");
        }
        const {id,role}=data;
        if(!id||!role) return res.status(400).send("Invalid token");
        let profileDetails;
        if(role==='driver'){
            profileDetails=await driver.findById(id);
            if(!profileDetails) return res.status(400).send("invalid id");
            res.status(200).json({
                success:true,
                data:profileDetails,
            })
        }
        else {
            profileDetails=await user.findById(id);
            if(!profileDetails) return res.status(400).send("invalid id");
            res.status(200).json({
                success:true,
                data:profileDetails,
            })
        }

    }
    catch(err){
        res.status(401).json({
            status:"false",
            message:err,
        })
    }
}
module.exports={profile};
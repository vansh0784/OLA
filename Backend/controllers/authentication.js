const driver = require("../models/driver.model");
const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const register = async (req, res) => {
  try {

    const { firstname, lastname, email, password,role} = req.body;
    console.log(firstname);
    if (!firstname || !lastname || !email || !password )
      return res.status(400).send("Complete all the required fields");
    if (role === "driver") {
      const { vehicle, location, isAvailable } = req.body;
      const driverDetail = await driver.create({
        firstname,
        lastname,
        email,
        password,
        phone,
        isAvailable,
        vehicle,
        location,
      });
      res.status(200).json({
        success: true,
        message: "Driver Entered Successfully",
        data:driverDetail,
      });
    } else {
      const userDetail = await user.create({
        firstname,
        lastname,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: "User Entered Successfully",
        data:userDetail,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};

const login=async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email||!password||!role) return res.status(400).send("All fields are required");
        if(role==="driver"){
            const driverDetails=await driver.findOne({email});
            if(!driverDetails){
                return res.status(400).send("Invalid email");
            }
            const verifyPassword=await bcrypt.compare(password,driverDetails?.password);
            if(!verifyPassword){
                return res.status(400).send("Password is Wrong");
            }
            const payload={
                id:driverDetails?._id,
                email:driverDetails?.email,
                role:driverDetails?.role,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET);
            if(!token){
                return res.status(500).send("token is not generated");
            }
            res.cookie("token",token);
            res.status(200).json({
              success:true,
              message:"login Successful"
            });
        } else{
          const userDetails=await user.findOne({email});
            if(!userDetails){
                return res.status(400).send("Invalid email");
            }
            const verifyPassword=await bcrypt.compare(password,userDetails?.password);
            if(!verifyPassword){
                return res.status(400).send("Password is Wrong");
            }
            const payload={
                id:userDetails?._id,
                email:userDetails?.email,
                role:userDetails?.role,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET);
            if(!token){
                return res.status(500).send("token is not generated");
            }
            res.cookie("token",token);
            res.status(200).json({
              success:true,
              message:"login Successful",
              token,
            });
        }

    } catch(err){

      res.status(403).json({
        success:false,
        message:err,
      });

    }
}

const logout=async(req,res)=>{
  try{
    res.clearCookie("token");
    res.status(200).send("Logout successfully")
  }
  catch(err){
    res.status(403).json({
        success:false,
        message:err,
      });
  }
}
module.exports={register,login,logout};

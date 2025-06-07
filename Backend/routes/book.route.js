const express=require("express");
const verifyToken=require("../middlewares/auth");
const {register,login,logout}=require("../controllers/authentication");

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",verifyToken,logout);

module.exports=router;
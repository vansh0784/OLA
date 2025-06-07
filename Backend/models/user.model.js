const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        match:[/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
    },
    role:{
        type:String,
        enum:['user','driver'],
        default:'user',
    }
},{
    timestamps:true,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    } catch(err){
        next(err);
    }
})

module.exports=mongoose.model("User",userSchema);
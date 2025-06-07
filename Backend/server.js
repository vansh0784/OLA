const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const cookieparser=require("cookie-parser");
const connectDb=require("./config/db")
const app=express();
const authRoute=require("./routes/auth.route");


dotenv.config();

app.use(cors());
app.use(cookieparser())
app.use(express.json())
app.use('/api',authRoute)

connectDb().then(()=>
    app.listen(process.env.PORT,()=>{
        console.log("Server Connected Successfully");
    })
).catch((err)=>{
    console.log("Connection failed ",err);
});

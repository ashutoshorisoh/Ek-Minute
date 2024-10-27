import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB(()=>{
    app.listen(process.env.PORT || 8000), ()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    }})
.then()
.catch((error)=>{
    console.log("mongo db connectio failed:", error);
    
})

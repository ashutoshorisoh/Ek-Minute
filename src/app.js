import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit: "16kb"})) //accept files in json format
app.use(express.urlencoded({extended: true})) //encodes url and ignores %20 kinda stuff
app.use(express.static("public")) //to store images on folder (public folder)
app.use(cookieParser) //to do crud operations on users cookie on browser

//routes

import userRouter from './routes/user.routes.js'
  
//routes declaration

//app.use("/users", userRouter)

//professinal way:
app.use("/api/v1/users", userRouter)

export { app }
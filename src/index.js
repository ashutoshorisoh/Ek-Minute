// index.js
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";  // Import the app from app.js

dotenv.config({
    path: './env' // Ensure the correct path to your .env file
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });

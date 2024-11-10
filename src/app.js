import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));

app.use(express.json({ limit: "16kb" })); // Parse JSON payloads up to 16kb in size
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static("public")); // Serve static files from the "public" folder
app.use(cookieParser()); // Use cookie-parser for handling cookies

// Import routes
import userRouter from './routes/user.routes.js';

// Route declarations
app.use("/api/v1/users", userRouter); // Mount user routes at /api/v1/users

export { app };

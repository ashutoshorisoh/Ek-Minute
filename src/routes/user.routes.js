// src/routes/user.routes.js
import express from "express";
const router = express.Router();
import {registerUser} from "../controllers/user.controller.js";

// Register user route
router.post("/register", registerUser); // POST request for user registration

// Example route (optional)
router.get("/", (req, res) => {
    res.send("User route is working!");
});

export default router;

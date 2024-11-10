// src/routes/user.routes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Register user route with multer file upload middleware
router.post(
  "/register",  // Define the route path for registration
  upload.fields([  // Use multer middleware to handle file uploads
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverimage",
      maxCount: 1
    }
  ]),
  registerUser  // Call the registerUser controller after file uploads are processed
);

// Login user route
router.post(
  "/login",  // Define the route path for login
  loginUser  // Call the loginUser controller
);

export default router;

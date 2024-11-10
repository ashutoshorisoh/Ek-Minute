// src/controllers/user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js"; // Assuming asyncHandler is in utils

// Controller function to register a user
const registerUser = asyncHandler(async (req, res) => {
    console.log("Request body:", req.body);  // Log incoming request data
    res.status(200).json({
        message: "User registration ",
    });
});

export { registerUser };

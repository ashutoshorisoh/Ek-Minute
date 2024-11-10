import { asyncHandler } from "../utils/asyncHandler.js"; // Assuming asyncHandler is in utils
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller function to register a user
const registerUser = asyncHandler(async (req, res) => {
    // Extract user details from the request body
    const { username, email, fullname, password } = req.body;
    console.log("email:", email);

    // Validate required fields
    if ([fullname, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Full name, username, email, and password are required");
    }

    // Check if the user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    // Handle file uploads: avatar and cover image
    const avatarLocalPath = req.files?.avatar ? req.files.avatar[0]?.path : null;
    const coverimageLocalPath = req.files?.coverimage ? req.files.coverimage[0]?.path : null;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    try {
        // Upload files to Cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverimage = coverimageLocalPath ? await uploadOnCloudinary(coverimageLocalPath) : null;

        if (!avatar) {
            throw new ApiError(400, "Avatar upload failed");
        }

        // Create a new user record
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            username: username.toLowerCase(),
            email,
            coverimage: coverimage?.url || "",  // Cover image is optional
            password,
        });

        // Find the created user and exclude sensitive data (password, refresh token)
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        // Send the success response
        return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));

    } catch (error) {
        console.error('Error during registration:', error);
        throw new ApiError(500, "Something went wrong during user registration");
    }
});

export { registerUser };

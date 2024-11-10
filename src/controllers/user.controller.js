// src/controllers/user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js"; // Assuming asyncHandler is in utils
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {upload} from "../middlewares/multer.middleware.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

// Controller function to register a user
const registerUser = asyncHandler(async (req, res) => {
    
    //get detail from user (model db)
    const { username, email, fullname, password } = req.body;
    console.log("email:", email);

    if(
        [ fullname, username, email, password ].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "full name is required")
    }

    const existedUser= await User.findOne({
        $or : [{username}, {email}]
    }
    )
    if (existedUser){
        throw new ApiError(409, "username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverimageLocalPath = req.files?.coverimage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")  //avatar is required
    }

    //upload to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = await uploadOnCloudinary(coverimageLocalPath)

    //check if avatar is uploaded on cloudinary

    

    if(!avatar){
        throw new ApiError(400, "avatar file is required")  //avatar is required
    }

    //create user object and enter in db

    User.create({
          fullname,
          avatar: avatar.url, //since it is image
          username: username.toLowerCase,
          email,
          coverimage: coverimage?.url || "",
          password, //since cover image is not a madatory
        })

        //to check if user object is created

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //to delete password from db
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering user")
    }

    //return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registyered successfully")
    )



});

export { registerUser };

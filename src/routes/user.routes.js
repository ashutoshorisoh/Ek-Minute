import { Router } from "express";
import {registerUser} from "../controller/user.controller.js"

const userRouter = Router();
userRouter.route("/register").post(registerUser)

export default userRouter;
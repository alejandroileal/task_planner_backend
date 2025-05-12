import express from "express";
import { userController } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/profile", authenticate, userController.getProfile);

export default userRouter;

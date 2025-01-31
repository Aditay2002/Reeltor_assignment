import express from "express";
import { verifyToken } from "../middleware/authorizationMiddleware.js";  
import { sendNotification, updateUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.patch("/profile/update", verifyToken, updateUser);
userRouter.post("/notifications/send", verifyToken, sendNotification);

export default userRouter;

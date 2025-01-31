import express from "express";  
import { signUp, login } from "../controllers/auth.js";

const authenticationRouter = express.Router();

authenticationRouter.post("/register", signUp);
authenticationRouter.post("/authenticate", login);

export default authenticationRouter;

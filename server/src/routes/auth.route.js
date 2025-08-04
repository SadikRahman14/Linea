import { Router } from "express";
import { login, signup, getUserInfo, refreshAccessToken } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.route("/signup").post(signup)
authRoutes.route("/login").post(login)
authRoutes.route("/refresh-token").post(verifyJWT, refreshAccessToken)
authRoutes.route("/user-info").get(verifyJWT, getUserInfo)

export default authRoutes;
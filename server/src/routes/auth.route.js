import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.route("/signup").post(signup)
authRoutes.route("/login").post(login)

export default authRoutes;
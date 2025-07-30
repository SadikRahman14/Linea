import { Router } from "express";

import { signup } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.route("/signup").post(signup)

export default authRoutes;
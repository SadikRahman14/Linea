import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchContact } from "../controllers/contact.controller.js";

const contactRoutes = Router();

contactRoutes.route("/search").post(verifyJWT, searchContact)

export default contactRoutes;
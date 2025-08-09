import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchContact, getContactsForDMList } from "../controllers/contact.controller.js";

const contactRoutes = Router();

contactRoutes.route("/search").post(verifyJWT, searchContact)
contactRoutes.route("/get-contacts-for-dm").get(verifyJWT, getContactsForDMList)

export default contactRoutes;
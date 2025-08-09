import {Router} from "express"
import { getMessages } from "../controllers/messages.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const messagesRoutes = Router();

messagesRoutes.route("/get-messages").post(verifyJWT, getMessages)

export default messagesRoutes;
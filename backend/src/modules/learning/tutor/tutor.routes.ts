import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";
import { tutorChatController } from "./tutor.controller.js";

const router = Router();

router.post("/chat", protectRoute, tutorChatController);

export default router;
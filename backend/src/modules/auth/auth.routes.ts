import { Router } from "express";
import {
  signupController,
  loginController,
  getMe,
  logout,
} from "./auth.controller.js";
import { protectRoute } from "./auth.middleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", protectRoute, getMe);

router.post("/logout", protectRoute, logout);
export default router;
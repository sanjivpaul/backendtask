import { Router } from "express";
import {
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../../controllers/user/user.controller.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpassword").post(forgetPassword);
router.route("/updatepassword").post(resetPassword);

export default router;

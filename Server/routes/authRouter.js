import { Router } from "express";
import { googleLogin } from "../controllers/authController.js";
import { signup, login, logout } from "../controllers/user.controller.js";

const router = Router();

router.get("/test", (req, res) => {
  res.send("test pass");
});

router.get("/google", googleLogin);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

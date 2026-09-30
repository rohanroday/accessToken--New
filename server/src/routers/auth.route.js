import { Router } from "express";
import { registerUser,loginUser,getUser,refreshToken } from "../controllers/auth.controller.js";
import { registerUserValidator,loginUserValidator } from "../validators/auth.validator.js";


const router = Router();


router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);
router.post("/refresh", refreshToken);
router.get("/me", getUser);



export default router;
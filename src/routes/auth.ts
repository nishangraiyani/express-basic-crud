import { Router } from "express";
import {
  loginController,
  signUpController,
} from "../controller/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { signUpValidator } from "../validation/auth.validation";

const router = Router();

router.post("/sign-up", validate(signUpValidator), signUpController);

router.post("/login", loginController);

export const authRouter = router;

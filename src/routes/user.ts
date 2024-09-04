import { Router } from "express";
import { GenericService } from "../services/generic.service";
import { UserModel, userSchema } from "../models/user.model";
import { UserService } from "../services/user.service";
import { validate } from "../middleware/validate.middleware";
import {
  createUserValidation,
  deleteUserValidation,
  getUserByIdValidation,
  paginationValidation,
  updateUserValidation,
} from "../validation/user.validation";
import { createUser, getUser, getUsers } from "../controller/user.controller";

const router = Router();
// router.get("/", getUsers);
router.get("/:userId", validate(getUserByIdValidation), getUser);
router.get("/", validate(paginationValidation),getUsers);

// router.post("/", validate(createUserValidation), createUser);


// router.put("/:id", validate(updateUserValidation));

// router.delete("/:id", validate(deleteUserValidation));

export const userRouter = router;

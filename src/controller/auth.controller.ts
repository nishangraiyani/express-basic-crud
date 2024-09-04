import { Request } from "express";
import {
  config,
  encryptPassword,
  generateToken,
  response,
  serverError,
} from "../utils/common";
import { UserService } from "../services/user.service";

const userService = new UserService();
export const signUpController = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;

    const userExists = await userService.getUser(
      { email },
      { email: 1, createdAt: 1 }
    );
    if (userExists) {
      return response(res, true, 400, "Email already exists");
    }
    const user = await userService.create({
      email: email,
      password: encryptPassword(password),
    });

    // if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
    //   return response(res, false, 200, "success", {
    //     message: "success",
    // accessToken: generateToken({ email: email, admin: true }, "30d"),
    // });
    // } else {
    // return response(res, true, 404, "Not Found");
    // }
  } catch (error) {
    return serverError(res, error);
  }
};
export const loginController = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;
    console.log("email, password", email, password);
    console.log("", config.ADMIN_EMAIL, config.ADMIN_PASSWORD);
    console.log(
      "email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD",
      email === config.ADMIN_EMAIL,
      password === config.ADMIN_PASSWORD
    );
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return response(res, false, 200, "success", {
        message: "success",
        accessToken: generateToken({ email: email, admin: true }, "30d"),
      });
    } else {
      return response(res, true, 404, "Not Found");
    }
  } catch (error) {
    return serverError(res, error);
  }
};

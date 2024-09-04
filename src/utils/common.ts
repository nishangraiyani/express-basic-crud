import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const config = Object.freeze({
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  PRIVATE_KEY: process.env.PRIVATE_KEY ?? "jwt-private-key",
});
console.log('config', config)
export const response = (
  res: any,
  isError: boolean,
  statusCode: number,
  message: string | null,
  data?: any
) => {
  if (!isError) {
    return res.status(statusCode).json({
      message: message,
      data,
    });
  }
  return res.status(statusCode).json({
    error: message,
  });
};

export const serverError = (res: any, error: any) => {
  console.log("error", error);
  return response(
    res,
    true,
    500,
    "Something went wrong, please try again later."
  );
};

export const generateToken = (payload: any, expiresIn: string = "30d") => {
  return jwt.sign(payload, config.PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn,
  });
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.PRIVATE_KEY);
};

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (newPassword: string, oldPassword: string) => {
  return bcrypt.compare(newPassword, oldPassword);
};

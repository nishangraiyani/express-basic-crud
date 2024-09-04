import Joi from "joi";

export const signUpValidator = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(8).max(32).required(),
  confirmPassword: Joi.string().trim().required().equal(Joi.ref("password")),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

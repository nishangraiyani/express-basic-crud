import Joi from "joi";

export const idValidation = Joi.string().hex().length(24).trim().required();

export const createUserValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(8).max(32).required(),
  username: Joi.string().trim().min(3).max(32).required(),
  profile: Joi.object({
    age: Joi.number().min(10).required(),
    birthDate: Joi.date().required(),
    fullName: Joi.string().trim().required(),
    bio: Joi.string().trim().required(),
  }).required(),
});

export const updateUserValidation = Joi.object({
  userId: idValidation,
  update: Joi.object({
    email: createUserValidation.extract("email").optional(),
    age: createUserValidation.extract("profile.age").optional(),
    birthDate: createUserValidation.extract("profile.birthDate").optional(),
    bio: createUserValidation.extract("profile.bio").optional(),
  }).required(),
});

export const deleteUserValidation = Joi.object({
  userId: idValidation,
});
export const getUserByIdValidation = Joi.object({
  userId: idValidation,
});

export const paginationValidation = Joi.object({
  perPage: Joi.number().greater(0).required(),
  page: Joi.number().required().greater(0).required(),
});

import { NextFunction, Request } from "express";
import Joi from "joi";

export const validate = (schema: Joi.Schema) => {
  return (req: Request, res: any, next: NextFunction) => {
    const combinedData = { ...req.params, ...req.query, ...req.body };

    const validationResult = schema.validate(combinedData);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details });
    }
    console.log("first");
    return next();
  };
};

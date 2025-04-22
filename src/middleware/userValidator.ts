import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse";

export const validateUpdatePassword: RequestHandler[] = [
  body("current_password")
    .notEmpty()
    .withMessage("Current password is required"),
  body("new_password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstErrorMessage = errors.array()[0].msg;
      res.status(400).json(errorResponse(firstErrorMessage, 400));
      return;
    }
    next();
  },
];

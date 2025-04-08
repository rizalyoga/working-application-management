import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse";

export const validateRegister: RequestHandler[] = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone_number")
    .matches(/^\+62\d{9,12}$/)
    .withMessage("Phone number must start with +62 followed by 9-12 digits"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errorResponse("Validation error", 400));
      return;
    }
    next();
  },
];

export const validateLogin: RequestHandler[] = [
  body("identifier")
    .notEmpty()
    .withMessage("Email or phone number is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errorResponse("Validation error", 400));
      return;
    }
    next();
  },
];

export const validateRefreshToken: RequestHandler[] = [
  body("refresh_token").notEmpty().withMessage("Refresh token is required"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errorResponse("Validation error", 400));
      return;
    }
    next();
  },
];

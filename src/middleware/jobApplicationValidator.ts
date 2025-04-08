import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse";

export const validateCreateJobApplication: RequestHandler[] = [
  body("application_date")
    .notEmpty()
    .withMessage("Application date is required"),
  body("job_position").notEmpty().withMessage("Job position is required"),
  body("job_portal").notEmpty().withMessage("Job Portal is required"),
  body("company_name").notEmpty().withMessage("Company Name is required"),
  body("status_id").notEmpty().withMessage("Status ID is required"),
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

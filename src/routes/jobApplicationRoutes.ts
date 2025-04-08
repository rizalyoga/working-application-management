import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createJobApplication,
  getUserJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
  getApplicationStatuses,
} from "../controllers/jobApplicationController";
import { validateCreateJobApplication } from "../middleware/jobApplicationValidator";

const router = express.Router();

// Get all application statuses (for dropdown menus)
router.get("/statuses", authenticate, getApplicationStatuses);

// CRUD operations
router.post(
  "/",
  validateCreateJobApplication,
  authenticate,
  createJobApplication
);
router.get("/", authenticate, getUserJobApplications);
router.get("/:id", authenticate, getJobApplicationById);
router.put("/:id", authenticate, updateJobApplication);
router.delete("/:id", authenticate, deleteJobApplication);

export default router;

import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  createJobApplication,
  getUserJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
  getApplicationStatuses,
  getJobApplicationTotalBasedOnStatus,
} from "../controllers/jobApplicationController";
import { validateCreateJobApplication } from "../middleware/jobApplicationValidator";

const router = express.Router();

// Get all application statuses (for dropdown menus)
router.get("/statuses", authenticate, getApplicationStatuses);

// Get Job Application Total Based On Status
router.get(
  "/group-by-status",
  authenticate,
  getJobApplicationTotalBasedOnStatus
);

// CRUD operations
router.post(
  "/",
  validateCreateJobApplication,
  authenticate,
  createJobApplication
);

// get all all job application
router.get("/", authenticate, getUserJobApplications);

// get application by application id
router.get("/:id", authenticate, getJobApplicationById);

// update job application data
router.put("/:id", authenticate, updateJobApplication);

// delete job application data
router.delete("/:id", authenticate, deleteJobApplication);

export default router;

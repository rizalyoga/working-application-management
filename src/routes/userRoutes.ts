import express from "express";
import {
  updatePassword,
  updateProfileData,
} from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";
import { validateUpdatePassword } from "../middleware/userValidator";

const router = express.Router();

router.put(
  "/update-password",
  validateUpdatePassword,
  authenticate,
  updatePassword
);
router.put("/update-profile-data", authenticate, updateProfileData);

export default router;

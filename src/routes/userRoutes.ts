import express from "express";
import {
  updatePassword,
  updateProfileData,
  updateProfilePicture,
} from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";
import { validateUpdatePassword } from "../middleware/userValidator";
import upload from "../middleware/uploadImageMiddleware";

const router = express.Router();

router.put(
  "/update-password",
  validateUpdatePassword,
  authenticate,
  updatePassword
);
router.put("/update-profile-data", authenticate, updateProfileData);
// Route untuk update profile picture
router.put(
  "/profile-picture",
  authenticate,
  upload.single("profile_picture"),
  updateProfilePicture
);

export default router;

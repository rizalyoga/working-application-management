import express from "express";
import {
  updatePassword,
  updateProfileData,
  getProfileUserData,
  updateProfilePicture,
  deleteProfilePicture,
} from "../controllers/userController";
import {
  uploadResume,
  deleteResume,
  getResume,
} from "../controllers/resumeController";
import { authenticate } from "../middleware/authMiddleware";
import { validateUpdatePassword } from "../middleware/userValidator";
import upload from "../middleware/uploadImageMiddleware";
import uploadPdf from "../middleware/uploadingResumeMiddleware";

const router = express.Router();

// get profile user data
router.get("/profile-data", authenticate, getProfileUserData);

// update profile user data
router.put("/update-profile-data", authenticate, updateProfileData);

//  profile password
router.put(
  "/update-password",
  validateUpdatePassword,
  authenticate,
  updatePassword
);

// Route untuk update profile picture
router.put(
  "/profile-picture",
  authenticate,
  upload.single("profile_picture"),
  updateProfilePicture
);

// Route untuk update profile picture
router.delete("/profile-picture", authenticate, deleteProfilePicture);

// Route untuk upload resume dengan error handling
router.post(
  "/post-resume",
  authenticate,
  uploadPdf.single("resume"),
  uploadResume
);

// Route untuk menghapus resume
router.delete("/delete-resume", authenticate, deleteResume);

// Route untuk mendapatkan info resume
router.get("/get-resume", authenticate, getResume);

export default router;

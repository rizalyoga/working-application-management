import express from "express";
import {
  createNewSchedule,
  deleteSchedule,
  getSchedules,
} from "../controllers/shedulerController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// get schedules data
router.get("/my-shedules", authenticate, getSchedules);

// post new schedule data
router.post("/my-shedules", authenticate, createNewSchedule);

// delete schedule data
router.delete("/:id", authenticate, deleteSchedule);

export default router;

import express from "express";
import {
  createNewSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  updateSchedule,
} from "../controllers/shedulerController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// get schedules data
router.get("/my-shedules", authenticate, getSchedules);

// get schedule data by id
router.get("/:id", authenticate, getScheduleById);

// get schedule data by id
router.put("/:id", authenticate, updateSchedule);

// post new schedule data
router.post("/my-shedules", authenticate, createNewSchedule);

// delete schedule data
router.delete("/:id", authenticate, deleteSchedule);

export default router;

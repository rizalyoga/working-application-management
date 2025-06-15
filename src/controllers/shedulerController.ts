import { Request, Response } from "express";
import supabase from "../config/supabase";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const createNewSchedule = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { title, description, date, time } = req.body;

    const { data, error } = await supabase
      .from("calendar_schedule")
      .insert([
        {
          user_id: userId,
          title,
          description,
          date,
          time,
        },
      ])
      .select();

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error creating new shedule: ${error.message}`, 500)
        );
    }

    res.status(201).json(successResponse("Schedule created successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const { data, error } = await supabase
      .from("calendar_schedule")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error fetching shedule: ${error.message}`, 500));
    }

    res
      .status(200)
      .json(successResponse("Schedule retrieved successfully", data));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const { data: existingApp, error: checkError } = await supabase
      .from("calendar_schedule")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (checkError) {
      res
        .status(checkError.code === "PGRST116" ? 404 : 500)
        .json(
          errorResponse(
            checkError.code === "PGRST116"
              ? "Schedule not found"
              : `Error checking Schedule: ${checkError.message}`,
            checkError.code === "PGRST116" ? 404 : 500
          )
        );
    }

    const { error } = await supabase
      .from("calendar_schedule")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error deleting schedule: ${error.message}`, 500));
    }

    res
      .status(200)
      .json(successResponse("Schedule deleted successfully", null));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

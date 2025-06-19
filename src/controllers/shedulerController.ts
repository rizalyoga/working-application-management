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
      .select("id, title, description,date,time,created_at")
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

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from("calendar_schedule")
      .select("id, title, description,date,time,created_at")
      .eq("id", id)
      .eq("user_id", userId) // Ensure user can only access their own data
      .single();

    if (error) {
      res
        .status(error.code === "PGRST116" ? 404 : 500)
        .json(
          errorResponse(
            error.code === "PGRST116"
              ? "Schedule not found"
              : `Error fetching schedule: ${error.message}`,
            error.code === "PGRST116" ? 404 : 500
          )
        );
    }

    res
      .status(200)
      .json(successResponse("Schedule retrieved successfully", data));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const { title, description, date, time } = req.body;

    // Check if schedule available
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
              : `Error checking schedule: ${checkError.message}`,
            checkError.code === "PGRST116" ? 404 : 500
          )
        );
    }

    const updateData = {
      title,
      description,
      date,
      time,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("calendar_schedule")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", userId)
      .select("id, title, description,date,time,created_at")
      .single();

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error updating schedule data: ${error.message}`, 500)
        );
    }

    res
      .status(200)
      .json(successResponse("Schedule updated successfully", data));
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

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import supabase from "../config/supabase";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { JobApplication } from "../models/types";

// Create a new job application
export const createJobApplication = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Assuming user ID is added by auth middleware
    const {
      application_date,
      job_position,
      job_portal,
      job_url,
      company_name,
      status_id,
      notes,
    } = req.body;

    // Create new job application
    const { data, error } = await supabase
      .from("job_applications")
      .insert([
        {
          user_id: userId,
          application_date,
          job_position,
          job_portal,
          job_url,
          company_name,
          status_id,
          notes: notes || null,
        },
      ])
      .select();

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error creating job application: ${error.message}`, 500)
        );
    }

    res
      .status(201)
      .json(successResponse("Job application created successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Get all job applications for a user
export const getUserJobApplications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Assuming user ID is added by auth middleware

    // Query parameters for filtering
    const { status_id } = req.query;

    // Start building query
    let query = supabase
      .from("job_applications")
      .select(
        `
        *,
        application_statuses (name)
      `
      )
      .eq("user_id", userId);

    // Add status filter if provided
    if (status_id) {
      query = query.eq("status_id", status_id);
    }

    // Order by application date (most recent first)
    query = query.order("application_date", { ascending: false });

    const { data, error } = await query;

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `Error fetching job applications: ${error.message}`,
            500
          )
        );
    }

    // Format the response
    const formattedData = data?.map((app) => ({
      id: app.id,
      application_date: app.application_date,
      job_position: app.job_position,
      job_portal: app.job_portal,
      job_url: app.job_url,
      company_name: app.company_name,
      status: app.application_statuses.name,
      status_id: app.status_id,
      notes: app.notes,
    }));

    res
      .status(200)
      .json(
        successResponse(
          "Job applications retrieved successfully",
          formattedData
        )
      );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Get a specific job application by ID
export const getJobApplicationById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from("job_applications")
      .select(
        `
        *,
        application_statuses (name),
        application_status_history (
          changed_at,
          status_id,
          application_statuses (name)
        )
      `
      )
      .eq("id", id)
      .eq("user_id", userId) // Ensure user can only access their own data
      .single();

    if (error) {
      res
        .status(error.code === "PGRST116" ? 404 : 500)
        .json(
          errorResponse(
            error.code === "PGRST116"
              ? "Job application not found"
              : `Error fetching job application: ${error.message}`,
            error.code === "PGRST116" ? 404 : 500
          )
        );
    }

    // Format the response
    const formattedData = {
      id: data.id,
      application_date: data.application_date,
      job_position: data.job_position,
      job_portal: data.job_portal,
      job_url: data.job_url,
      company_name: data.company_name,
      status: data.application_statuses.name,
      status_id: data.status_id,
      notes: data.notes,
      status_history: data.application_status_history.map((history: any) => ({
        changed_at: history.changed_at,
        status: history.application_statuses.name,
        status_id: history.status_id,
      })),
    };

    res
      .status(200)
      .json(
        successResponse("Job application retrieved successfully", formattedData)
      );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Update a job application
export const updateJobApplication = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const {
      application_date,
      job_position,
      job_portal,
      job_url,
      company_name,
      status_id,
      notes,
    } = req.body;

    // Check if application exists and belongs to user
    const { data: existingApp, error: checkError } = await supabase
      .from("job_applications")
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
              ? "Job application not found"
              : `Error checking job application: ${checkError.message}`,
            checkError.code === "PGRST116" ? 404 : 500
          )
        );
    }

    // Build update object with only provided fields
    const updateData: any = {};
    if (application_date !== undefined)
      updateData.application_date = application_date;
    if (job_position !== undefined) updateData.job_position = job_position;
    if (job_url !== undefined) updateData.job_url = job_url;
    if (job_portal !== undefined) updateData.job_portal = job_portal;
    if (company_name !== undefined) updateData.company_name = company_name;
    if (status_id !== undefined) updateData.status_id = status_id;
    if (notes !== undefined) updateData.notes = notes;

    // Add updated_at timestamp
    updateData.updated_at = new Date().toISOString();

    // Update job application
    const { data, error } = await supabase
      .from("job_applications")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", userId) // Extra safety to ensure user can only update their own data
      .select(
        `
        *,
        application_statuses (name)
      `
      )
      .single();

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error updating job application: ${error.message}`, 500)
        );
    }

    // Format the response
    const formattedData = {
      application_date: data.application_date,
      job_position: data.job_position,
      job_portal: data.job_portal,
      job_url: data.job_url,
      company_name: data.company_name,
      status: data.application_statuses.name,
      status_id: data.status_id,
      notes: data.notes,
    };

    res
      .status(200)
      .json(
        successResponse("Job application updated successfully", formattedData)
      );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Delete a job application
export const deleteJobApplication = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    // Check if application exists and belongs to user
    const { data: existingApp, error: checkError } = await supabase
      .from("job_applications")
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
              ? "Job application not found"
              : `Error checking job application: ${checkError.message}`,
            checkError.code === "PGRST116" ? 404 : 500
          )
        );
    }

    // Delete the job application
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", id)
      .eq("user_id", userId); // Extra safety to ensure user can only delete their own data

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error deleting job application: ${error.message}`, 500)
        );
    }

    res
      .status(200)
      .json(successResponse("Job application deleted successfully", null));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Delete all job application
export const deleteAllJobApplication = async (req: Request, res: Response) => {
  console.log("INI REQU", req);
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      res.status(401).json(errorResponse("User not authenticated", 401));
    }

    // Delete all the job application
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("user_id", userId); // Extra safety to ensure user can only delete their own data

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error deleting job application: ${error.message}`, 500)
        );
    }

    res
      .status(200)
      .json(successResponse("All job application deleted successfully", null));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Get application statuses (for dropdown menus)
export const getApplicationStatuses = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("application_statuses")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `Error fetching application statuses: ${error.message}`,
            500
          )
        );
    }

    res
      .status(200)
      .json(
        successResponse("Application statuses retrieved successfully", data)
      );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const getJobApplicationTotalBasedOnStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const { data, error } = await supabase
      .from("job_applications")
      .select(
        `
        status_id
      `
      )
      .eq("user_id", userId); // Ensure user can only access their own data

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `Error fetching job application stats: ${error.message}`,
            500
          )
        );
      return;
    }

    const countTotalStatus = (status_id: number) => {
      return data.reduce(
        (count, status) => (status.status_id === status_id ? count + 1 : count),
        0
      );
    };

    const formatedData = {
      total_application: data.length,
      apply: countTotalStatus(1),
      screening: countTotalStatus(2),
      interview_hr: countTotalStatus(3),
      interview_hr_ii: countTotalStatus(7),
      hr_test: countTotalStatus(13),
      psychological_test: countTotalStatus(12),
      interview_user: countTotalStatus(4),
      interview_user_ii: countTotalStatus(8),
      technical_test: countTotalStatus(14),
      interview_C_level: countTotalStatus(9),
      interview_C_level_ii: countTotalStatus(10),
      interview_CEO: countTotalStatus(11),
      ignored_by_company: countTotalStatus(15),
      reject_cv: countTotalStatus(16),
      reject_interview_hr: countTotalStatus(17),
      reject_interview_user: countTotalStatus(18),
      reject_hr_test: countTotalStatus(19),
      reject_technical_test: countTotalStatus(20),
      reject: countTotalStatus(5),
      closed_vacancy: countTotalStatus(21),
      success: countTotalStatus(6),
    };

    res
      .status(200)
      .json(
        successResponse(
          "Job application stats retrieved successfully",
          formatedData
        )
      );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import supabase from "../config/supabase";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const updateProfileData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, email, phone_number } = req.body;

    if (!name && !email && !phone_number) {
      res.status(400).json(errorResponse(`Please fill data`, 400));
    }

    // Check if user exists
    const { data: existingApp, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .single();

    if (checkError) {
      res
        .status(checkError.code === "PGRST116" ? 404 : 500)
        .json(
          errorResponse(
            checkError.code === "PGRST116"
              ? "User not found"
              : `Error checking user data: ${checkError.message}`,
            checkError.code === "PGRST116" ? 404 : 500
          )
        );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone_number !== undefined) updateData.phone_number = phone_number;

    // update time stamp untuk update_at
    updateData.updated_at = new Date().toISOString();

    // Update job application
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select(
        `
        *
      `
      )
      .single();

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(
            `Error updating profile user data: ${error.message}`,
            500
          )
        );
    }

    const formattedData = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    res
      .status(200)
      .json(
        successResponse("User profile updated successfully", formattedData)
      );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // User ID dari middleware autentikasi
    const { current_password, new_password } = req.body;

    // Ambil data user dari database
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("password_hash")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Verifikasi password lama
    const isCurrentPasswordValid = await bcrypt.compare(
      current_password,
      user?.password_hash
    );

    if (!isCurrentPasswordValid) {
      res.status(401).json(errorResponse("Current password is incorrect", 401));
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(new_password, salt);

    // Update password di database
    const { error: updateError } = await supabase
      .from("users")
      .update({
        password_hash: newPasswordHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      res
        .status(500)
        .json(
          errorResponse(`Error updating password: ${updateError.message}`, 500)
        );
    }

    res
      .status(200)
      .json(successResponse("Password changed successfully", null));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

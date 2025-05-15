import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import supabase from "../config/supabase";
import { successResponse, errorResponse } from "../utils/apiResponse";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const getProfileUserData = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

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

    // Start building query
    let query = supabase.from("users").select(`*`).eq("id", userId);

    const { data, error } = await query;

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error fetching user data: ${error.message}`, 500));
    }

    const formattedData = data?.map((app) => ({
      id: app.id,
      name: app.name,
      email: app.email,
      phone_number: app.phone_number,
      profile_picture_url: app.profile_picture_url,
      resume_url: app.resume_url,
    }));

    res
      .status(200)
      .json(successResponse("Get data user successfully!", formattedData));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

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
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
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

// Update Password
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

// update profile picture
export const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Periksa apakah ada file yang diunggah
    if (!req.file) {
      res.status(400).json(errorResponse("No file uploaded", 400));
    }

    // Validasi tipe file (hanya izinkan gambar)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    const file = req.file as Express.Multer.File;
    if (!allowedTypes.includes(file.mimetype)) {
      res
        .status(400)
        .json(
          errorResponse(
            "File type not allowed. Please upload an image (JPEG, PNG, JPG, GIF)",
            400
          )
        );
    }

    // Validasi ukuran file (max 500KB = 500 * 1024 bytes)
    const maxSize = 1000 * 1024; // 500KB
    if (file.size > maxSize) {
      res
        .status(400)
        .json(
          errorResponse(
            "File size too large. Maximum size allowed is 500KB",
            400
          )
        );
    }

    // Mendapatkan data user saat ini
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("profile_picture_url")
      .eq("id", userId)
      .single();

    if (userError) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Hapus file lama dari storage jika ada
    if (userData?.profile_picture_url) {
      const oldFilePath = userData.profile_picture_url.split("/").pop();
      if (oldFilePath) {
        await supabase.storage.from("profile-pictures").remove([oldFilePath]);
      }
    }

    // Generate nama file unik
    const fileExt = path.extname(file.originalname);
    const fileName = `${userId}_${uuidv4()}${fileExt}`;

    // Upload file ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      res
        .status(500)
        .json(
          errorResponse(`Error uploading file: ${uploadError.message}`, 500)
        );
    }

    // Dapatkan URL publik dari file yang diunggah
    const { data: urlData } = await supabase.storage
      .from("profile-pictures")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // Update profile picture URL di database
    const { data, error } = await supabase
      .from("users")
      .update({
        profile_picture_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("profile_picture_url")
      .single();

    if (error) {
      res
        .status(500)
        .json(
          errorResponse(`Error updating profile picture: ${error.message}`, 500)
        );
    }

    res
      .status(200)
      .json(successResponse("Profile picture updated successfully", data));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Mendapatkan data user saat ini
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("profile_picture_url")
      .eq("id", userId)
      .single();

    if (userError) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Cek apakah user memiliki resume
    if (!userData?.profile_picture_url) {
      res
        .status(404)
        .json(errorResponse("No profile picture found for this user", 404));
    }

    // Hapus file resume dari storage
    const oldFilePath = userData?.profile_picture_url.split("/").pop();
    if (oldFilePath) {
      const { error: deleteStorageError } = await supabase.storage
        .from("profile-pictures")
        .remove([oldFilePath]);

      if (deleteStorageError) {
        res
          .status(500)
          .json(
            errorResponse(
              `Error deleting profile picture file: ${deleteStorageError.message}`,
              500
            )
          );
      }
    }

    // Update database untuk menghapus reference ke resume
    const { data, error } = await supabase
      .from("users")
      .update({
        profile_picture_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("profile_picture_url")
      .single();

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error updating user data: ${error.message}`, 500));
    }

    res
      .status(200)
      .json(successResponse("Profile picture deleted successfully", data));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

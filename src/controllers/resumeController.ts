import { Request, Response } from "express";
import supabase from "../config/supabase";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const uploadResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Periksa apakah ada file yang diunggah
    if (!req.file) {
      res.status(400).json(errorResponse("No file uploaded", 400));
    }

    // Validasi tipe file (hanya izinkan PDF)
    const file = req.file as Express.Multer.File;
    if (file.mimetype !== "application/pdf") {
      res
        .status(400)
        .json(
          errorResponse("File type not allowed. Please upload a PDF file", 400)
        );
    }

    // Validasi ukuran file (max 1MB = 1024 * 1024 bytes)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      res
        .status(400)
        .json(
          errorResponse("File size too large. Maximum size allowed is 1MB", 400)
        );
    }

    // Mendapatkan data user saat ini
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("resume_url")
      .eq("id", userId)
      .single();

    if (userError) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Hapus file resume lama dari storage jika ada
    if (userData?.resume_url) {
      const oldFilePath = userData.resume_url.split("/").pop();
      if (oldFilePath) {
        await supabase.storage.from("resumes").remove([oldFilePath]);
      }
    }

    // Generate nama file unik
    const fileName = `${userId}_${uuidv4()}.pdf`;

    // Upload file ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, file.buffer, {
        contentType: "application/pdf",
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
      .from("resumes")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // Update resume URL di database
    const { data, error } = await supabase
      .from("users")
      .update({
        resume_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("resume_url")
      .single();

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error updating resume: ${error.message}`, 500));
    }

    res.status(200).json(successResponse("Resume uploaded successfully", data));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const deleteResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Mendapatkan data user saat ini
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("resume_url")
      .eq("id", userId)
      .single();

    if (userError) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Cek apakah user memiliki resume
    if (!userData?.resume_url) {
      res.status(404).json(errorResponse("No resume found for this user", 404));
    }

    // Hapus file resume dari storage
    const oldFilePath = userData?.resume_url.split("/").pop();
    if (oldFilePath) {
      const { error: deleteStorageError } = await supabase.storage
        .from("resumes")
        .remove([oldFilePath]);

      if (deleteStorageError) {
        res
          .status(500)
          .json(
            errorResponse(
              `Error deleting resume file: ${deleteStorageError.message}`,
              500
            )
          );
      }
    }

    // Update database untuk menghapus reference ke resume
    const { data, error } = await supabase
      .from("users")
      .update({
        resume_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("resume_url")
      .single();

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error updating user data: ${error.message}`, 500));
    }

    res.status(200).json(successResponse("Resume deleted successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

export const getResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Mendapatkan data user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("resume_url")
      .eq("id", userId)
      .single();

    if (userError) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Cek apakah user memiliki resume
    if (!userData?.resume_url) {
      res.status(404).json(errorResponse("No resume found for this user", 404));
    }

    res.status(200).json(
      successResponse("Resume retrieved successfully", {
        resume_url: userData?.resume_url,
      })
    );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

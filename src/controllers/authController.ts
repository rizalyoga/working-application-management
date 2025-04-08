import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import supabase from "../config/supabase";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { User, Session } from "../models/types";

// Function to generate JWT token
const generateToken = (user: { id: string; email: string }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT Secret is not defined");
  }
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

// Function to generate refresh token
const generateRefreshToken = (user: { id: string; email: string }) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT Refresh Secret is not defined");
  }
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
};

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone_number, password } = req.body;

    // Validate phone number format (starts with +62)
    if (!phone_number.startsWith("+62")) {
      res
        .status(400)
        .json(errorResponse("Phone number must start with +62", 400));
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${email},phone_number.eq.${phone_number}`)
      .limit(1);

    if (checkError) {
      res.status(500).json(errorResponse("Error checking existing user", 500));
    }

    if (existingUser && existingUser.length > 0) {
      res
        .status(400)
        .json(
          errorResponse(
            "User with this email or phone number already exists",
            400
          )
        );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          phone_number,
          password_hash: hashedPassword,
        },
      ])
      .select();

    if (createError || !newUser) {
      res
        .status(500)
        .json(
          errorResponse(`Error creating user: ${createError?.message}`, 500)
        );
    }

    const user = newUser?.[0];

    // Generate tokens
    const token = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // Calculate expiry times
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // Default 1 hour

    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7); // Default 7 days

    // Store session in database
    const { error: sessionError } = await supabase.from("sessions").insert([
      {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: refreshExpiry.toISOString(),
      },
    ]);

    if (sessionError) {
      res
        .status(500)
        .json(
          errorResponse(`Error creating session: ${sessionError.message}`, 500)
        );
    }

    //  user info and tokens
    res.status(201).json(
      successResponse(
        "User registered successfully",
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
          },
          tokens: {
            access_token: token,
            refresh_token: refreshToken,
            expires_in: 3600, // 1 hour in seconds
          },
        },
        201
      )
    );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    // Check if identifier is email or phone number
    const isEmail = identifier.includes("@");
    const field = isEmail ? "email" : "phone_number";

    // Find user by email or phone
    const { data: users, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq(field, identifier)
      .limit(1);

    if (findError) {
      res
        .status(500)
        .json(errorResponse(`Error finding user: ${findError.message}`, 500));
    }

    if (!users || users.length === 0) {
      res.status(401).json(errorResponse("Invalid credentials", 401));
    }

    const user = users?.[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      res.status(401).json(errorResponse("Invalid credentials", 401));
    }

    // Generate tokens
    const token = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // Calculate expiry times
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // Default 1 hour

    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7); // Default 7 days

    // Store session in database
    const { error: sessionError } = await supabase.from("sessions").insert([
      {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_at: refreshExpiry.toISOString(),
      },
    ]);

    if (sessionError) {
      res
        .status(500)
        .json(
          errorResponse(`Error creating session: ${sessionError.message}`, 500)
        );
    }

    // Return user info and tokens
    res.status(200).json(
      successResponse("Login successful", {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
        },
        tokens: {
          access_token: token,
          refresh_token: refreshToken,
          expires_in: 3600, // 1 hour in seconds
        },
      })
    );
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Logout user
export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json(errorResponse("Not authenticated", 401));
    }

    // Remove session from database
    const { error } = await supabase
      .from("sessions")
      .delete()
      .eq("user_id", req.user.id);

    if (error) {
      res
        .status(500)
        .json(errorResponse(`Error logging out: ${error.message}`, 500));
    }

    res.status(200).json(successResponse("Logged out successfully"));
  } catch (error: any) {
    res.status(500).json(errorResponse(`Server error: ${error.message}`, 500));
  }
};

// Refresh token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      res.status(400).json(errorResponse("Refresh token is required", 400));
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      res.status(500).json(errorResponse("Server configuration error", 500));
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET as jwt.Secret
    );
    const userId = (decoded as any).id;

    // Check if session exists in database
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("refresh_token", refresh_token)
      .single();

    if (sessionError || !session) {
      res.status(401).json(errorResponse("Invalid refresh token", 401));
    }

    // Check if refresh token is expired
    if (new Date(session.expires_at) < new Date()) {
      res.status(401).json(errorResponse("Refresh token expired", 401));
    }

    // Get user info
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      res.status(404).json(errorResponse("User not found", 404));
    }

    // Generate new tokens
    const newToken = generateToken({ id: user.id, email: user.email });
    const newRefreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // Calculate expiry times
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7); // Default 7 days

    // Update session in database
    const { error: updateError } = await supabase
      .from("sessions")
      .update({
        refresh_token: newRefreshToken,
        expires_at: refreshExpiry.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.id);

    if (updateError) {
      res
        .status(500)
        .json(
          errorResponse(`Error updating session: ${updateError.message}`, 500)
        );
    }

    //  return new tokens
    res.status(200).json(
      successResponse("Token refreshed successfully", {
        tokens: {
          access_token: newToken,
          refresh_token: newRefreshToken,
          expires_in: 3600, // 1 hour in seconds
        },
      })
    );
  } catch (error: any) {
    res.status(401).json(errorResponse("Invalid refresh token", 401));
  }
};

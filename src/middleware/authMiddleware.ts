import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase";
import { errorResponse } from "../utils/apiResponse";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      token?: string;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      res
        .status(401)
        .json(errorResponse("Access denied. No token provided.", 401));
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json(errorResponse("Access denied. No token provided.", 401));
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json(errorResponse("Server configuration error", 500));
    }

    // Verify token
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as jwt.Secret
    );

    // Check if session exists in database - ambil yang terbaru saja
    const { data: sessions, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", (decoded as any).id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !sessions || sessions.length === 0) {
      res
        .status(401)
        .json(errorResponse("Invalid token or session expired", 401));
    }

    const session = sessions?.[0];

    // Check if session is expired
    if (new Date(session.expires_at) < new Date()) {
      res.status(401).json(errorResponse("Session expired", 401));
    }

    // Set user and token in request object
    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json(errorResponse("Invalid token", 401));
  }
};

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { testDBConnection } from "./utils/testDBConnection";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Job Application Tracker API is running!" });
});

// Test route for database connection
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const connected = await testDBConnection();
    if (connected) {
      res.json({ message: "Database connection successful" });
    } else {
      res.status(500).json({ message: "Database connection failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error testing database connection", error });
  }
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { testDBConnection } from "./utils/testDBConnection";
import authRoutes from "./routes/authRoutes";
import jobApplicationRoutes from "./routes/jobApplicationRoutes";
import userRoutes from "./routes/userRoutes";
import { errorResponse } from "./utils/apiResponse";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger";
import fs from "fs";

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

// Setup Swagger
const cssPath = require.resolve("swagger-ui-dist/swagger-ui.css");
const css = fs.readFileSync(cssPath, "utf-8");

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {  customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui.css',
    customJs: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui-bundle.js',
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.52.5/swagger-ui-standalone-preset.js'
    ] })
);

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job-applications", jobApplicationRoutes);

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
  console.log(`Dokumentasi API tersedia di http://localhost:${port}/api-docs`);
});

export default app;

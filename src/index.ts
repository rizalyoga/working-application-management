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
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://l.facebook.com/l.php?u=https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fswagger-ui%2F4.1.0%2Fswagger-ui.min.css%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExeVdXYnFRemFrZ0Nhc3dKMAEerdmDq95qXZgzdXlJUWintKxhjrShAyMad-9DO6QtWszF_2lPAP5CxsUB-Oc_aem_p1V5gKxiQznas9vMyZ9oXA&h=AT3Ox666ez_z76EJtvzyfA56w5nxNYX49vPfUk_d6QQIw_DbzagKLvLnxcLL1gj6v-gWwx6S_yuvaue4b9zSkZlrHS8cqhFpuUFj3ctOWFKhEQuo3hAhI5lIgdQyg9OhjRo9LKN-&__tn__=R]-R&c[0]=AT14vT6bF9VSBmaTU_FHbyauA161PU2Pezo8bQuSTtbx27OTFIXB-NGoz3Pwz34phhTKqwEXV2lniAJ2ZnHf_vpxAEdWpPRkL9GdlR_aO03sMgnrCDzD-D0s_Yp1kqYtqS6J8gKVZXadklJSPohNHllybiqgiGZazwqkZA5W3yCMRe81Nolf0sc",
  })
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

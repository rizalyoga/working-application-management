import { Options } from "swagger-jsdoc";
import path from "path";
import { authDocs } from "../docs/auth";
import { jobApplicationDocs } from "../docs/jobApplication";
import { calendarDocs } from "../docs/calendar";
import { userResumeDocs } from "../docs/userResume";
import { userProfileDocs } from "../docs/user";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Track API",
      version: "1.0.0",
      description: "API documentation for Job-Track.",
    },
    servers: [
      {
        url: process.env.BASE_URL_BE,
        description: "Production server",
      },
      {
        url: "http://localhost:5500",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    // Inline paths dari file YAML
    paths: {
      ...authDocs,
      ...jobApplicationDocs,
      ...userProfileDocs,
      ...userResumeDocs,
      ...calendarDocs,
    },
  },
  // Ubah path API untuk mendukung environment production
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;

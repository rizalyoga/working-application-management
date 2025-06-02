import { Options } from "swagger-jsdoc";
import path from "path";

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
  },
  // Ubah path API untuk mendukung environment production
  apis: [
    path.join(process.cwd(), "src/docs/*.yaml"),
    path.join(process.cwd(), "src/routes/*.ts"),
    // Alternatif path untuk Vercel
    "./docs/*.yaml",
    "./routes/*.ts",
    // Path absolut sebagai fallback
    path.resolve(__dirname, "../docs/*.yaml"),
    path.resolve(__dirname, "../routes/*.ts"),
  ],
};

export default swaggerOptions;

import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Track API",
      version: "1.0.0",
      description: "API untuk mengelola lamaran pekerjaan",
    },
    servers: [
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
  apis: ["src/docs/*.yaml"], // Membaca file YAML di folder docs
};

export default swaggerOptions;

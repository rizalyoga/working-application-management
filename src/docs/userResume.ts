// src/config/swaggerDocs.ts
export const userResumeDocs = {
  "/api/v1/user/post-resume": {
    post: {
      summary: "Upload user resume",
      description: "Upload user resume in PDF format with file validation",
      tags: ["User Profile"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: ["file"],
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  description: "Resume file in PDF format only",
                },
              },
            },
            encoding: {
              file: {
                contentType: "application/pdf",
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Resume uploaded successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "success",
                  },
                  status_code: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Resume uploaded successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      resume_url: {
                        type: "string",
                        format: "uri",
                        description: "Public URL of the uploaded resume PDF",
                        example:
                          "https://your-supabase-url.supabase.co/storage/v1/object/public/resumes/123_uuid-string.pdf",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Bad Request - File validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 400,
                  },
                  message: {
                    type: "string",
                    enum: [
                      "No file uploaded",
                      "File type not allowed. Please upload a PDF file",
                      "File size too large. Maximum size allowed is 2MB",
                    ],
                    example: "File type not allowed. Please upload a PDF file",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "User Not Found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 404,
                  },
                  message: {
                    type: "string",
                    example: "User not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error uploading resume",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 500,
                  },
                  message: {
                    type: "string",
                    enum: [
                      "Error uploading file",
                      "Error updating resume",
                      "Server error",
                    ],
                    example: "Error uploading file",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/user/get-resume": {
    get: {
      summary: "Get link user resume",
      description: "Get link user resume",
      tags: ["User Profile"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: false,
      },
      responses: {
        "200": {
          description: "Resume retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "success",
                  },
                  status_code: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Resume retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      resume_url: {
                        type: "string",
                        example:
                          "https://your-supabase-url.supabase.co/storage/v1/object/public/resumes/123_uuid-string.pdf",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "No resume found for this user",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 404,
                  },
                  message: {
                    type: "string",
                    enum: ["No resume found for this user", "User not found"],
                    example: "No resume found for this user",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error uploading resume",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 500,
                  },
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/user/delete-resume": {
    delete: {
      summary: "Delete user resume",
      description: "Delete user resume",
      tags: ["User Profile"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: false,
      },
      responses: {
        "200": {
          description: "Resume deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "success",
                  },
                  status_code: {
                    type: "integer",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Resume deleted successfully",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "No resume found for this user",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 404,
                  },
                  message: {
                    type: "string",
                    enum: ["User not found", "No resume found for this user"],
                    example: "No resume found for this user",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error uploading resume",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success", "error"],
                    example: "error",
                  },
                  status_code: {
                    type: "integer",
                    example: 500,
                  },
                  message: {
                    type: "string",
                    enum: [
                      "Error deleting resume file",
                      "Error updating user data",
                      "Internal server error",
                    ],
                    example: "Internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

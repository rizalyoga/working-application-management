// src/config/swaggerDocs.ts
export const authDocs = {
  "/api/v1/auth/register": {
    post: {
      summary: "Register a new user",
      tags: ["Authentication"],
      security: [], // Menonaktifkan autentikasi untuk endpoint ini
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "John Doe",
                },
                email: {
                  type: "string",
                  example: "john.doe@example.com",
                },
                password: {
                  type: "string",
                  example: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  status_code: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "User registered successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "b1da7d64-7fe9-4745-92e2-eca895f21451",
                          },
                          name: {
                            type: "string",
                            example: "teras",
                          },
                          email: {
                            type: "string",
                            example: "user20@mail.com",
                          },
                          phone_number: {
                            type: "string",
                            example: "+6289012392020",
                          },
                          profile_picture_url: {
                            type: "string",
                            example:
                              "https://kasjdhjkasdjkhh.supabase.co/storage/v1/object/public/profile-pictures/b1da7d64-7fe9-4745-92e2-eca895f21451_28dcb73b-6ae2-4c37-8e5f-9b38ff20ff84.png",
                          },
                          resume_url: {
                            type: "string",
                            example:
                              "https://kasjdhjkasdjkhh.supabase.co/storage/v1/object/public/resumes/b1da7d64-7fe9-4745-92e2-eca895f21451_6d5027ca-fa88-4298-8071-216d3c33095f.pdf",
                          },
                        },
                      },
                      tokens: {
                        type: "object",
                        properties: {
                          access_token: {
                            type: "string",
                            example:
                              "askjdcnm,zx,asddddd.djksajdkjjdksjfdjnejknjdnfkjsdnfuenjnfusdnfjesnfuks.pvNVAtwitLgW1U1UapimGaw7m20_P2zvaIG9nxMN7H0",
                          },
                          refresh_token: {
                            type: "string",
                            example:
                              "askjdcnm,zx,asddddd.aslkdjlasjdiwejiwjeijduhefjdhsfsdbfjsdkfbksksdjfhuejsdkjf._gTB9B9CKb6624ym68eY-LJ55_j-4h5zFUuV-ZJClIc",
                          },
                          expires_in: {
                            type: "number",
                            example: 3600,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
                    example: 400,
                  },
                  message: {
                    type: "string",
                    example:
                      "User with this email or phone number already exists",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/login": {
    post: {
      summary: "Login user",
      tags: ["Authentication"],
      security: [], // Menonaktifkan autentikasi untuk endpoint ini
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["identifier", "password"],
              properties: {
                identifier: {
                  type: "string",
                  example: "john.doe@example.com",
                },
                password: {
                  type: "string",
                  example: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User logged in successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  status_code: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Login successful",
                  },
                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "b1da7d64-7fe9-4745-92e2-eca895f21451",
                          },
                          name: {
                            type: "string",
                            example: "teras",
                          },
                          email: {
                            type: "string",
                            example: "user20@mail.com",
                          },
                          phone_number: {
                            type: "string",
                            example: "+6289012392020",
                          },
                          profile_picture_url: {
                            type: "string",
                            example:
                              "https://kasjdhjkasdjkhh.supabase.co/storage/v1/object/public/profile-pictures/b1da7d64-7fe9-4745-92e2-eca895f21451_28dcb73b-6ae2-4c37-8e5f-9b38ff20ff84.png",
                          },
                          resume_url: {
                            type: "string",
                            example:
                              "https://kasjdhjkasdjkhh.supabase.co/storage/v1/object/public/resumes/b1da7d64-7fe9-4745-92e2-eca895f21451_6d5027ca-fa88-4298-8071-216d3c33095f.pdf",
                          },
                        },
                      },
                      tokens: {
                        type: "object",
                        properties: {
                          access_token: {
                            type: "string",
                            example:
                              "askjdcnm,zx,asddddd.djksajdkjjdksjfdjnejknjdnfkjsdnfuenjnfusdnfjesnfuks.pvNVAtwitLgW1U1UapimGaw7m20_P2zvaIG9nxMN7H0",
                          },
                          refresh_token: {
                            type: "string",
                            example:
                              "askjdcnm,zx,asddddd.aslkdjlasjdiwejiwjeijduhefjdhsfsdbfjsdkfbksksdjfhuejsdkjf._gTB9B9CKb6624ym68eY-LJ55_j-4h5zFUuV-ZJClIc",
                          },
                          expires_in: {
                            type: "number",
                            example: 3600,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
                    example: 401,
                  },
                  message: {
                    type: "string",
                    example: "Invalid credentials",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/logout": {
    post: {
      summary: "Logout user",
      tags: ["Authentication"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Logged out successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  status_code: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Logged out successfully",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Not authenticated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
                    example: 401,
                  },
                  message: {
                    type: "string",
                    example: "Not authenticated",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/refresh-token": {
    post: {
      summary: "Refresh access token",
      tags: ["Authentication"],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["refresh_token"],
              properties: {
                refresh_token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Token refreshed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  status_code: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example: "Token refreshed successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      tokens: {
                        type: "object",
                        properties: {
                          access_token: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          },
                          refresh_token: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          },
                          expires_in: {
                            type: "integer",
                            example: 3600,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Missing refresh token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
                    example: 400,
                  },
                  message: {
                    type: "string",
                    example: "Refresh token is required",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Invalid or expired refresh token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
                    example: 400,
                  },
                  message: {
                    type: "string",
                    example: "Invalid refresh token",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
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
      },
    },
  },
  "/api/v1/auth/request-reset-password": {
    post: {
      summary: "Request reset password",
      description:
        "Send the Reset Password link to the user's email if the email is registered.",
      tags: ["Authentication"],
      security: [], // Menonaktifkan autentikasi untuk endpoint ini
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "user@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Reset Password Link Successfully Sent",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  status_code: {
                    type: "number",
                    example: 200,
                  },
                  message: {
                    type: "string",
                    example:
                      "The reset link has been sent to your email. Please check your email inbox.",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Email not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  status_code: {
                    type: "number",
                    example: 404,
                  },
                  message: {
                    type: "string",
                    example: "Email not found.",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                  status_code: {
                    type: "integer",
                    example: 500,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/reset-password": {
    post: {
      summary: "Reset password",
      description:
        "Change the user's password based on the token sent by email.",
      tags: ["Authentication"],
      security: [], // Menonaktifkan autentikasi untuk endpoint ini
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["token", "new_password"],
              properties: {
                token: {
                  type: "string",
                  example: "your-reset-token",
                },
                new_password: {
                  type: "string",
                  format: "password",
                  example: "NewSecurePassword123!",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Password updated successfully",
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
                    example: "Password updated successfully",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid or expired token",
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
                    example: "Invalid or expired token",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Server error",
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
};

// Template untuk docs lainnya - ganti dengan content dari file YAML Anda
export const userDocs = {
  // Pindahkan content dari user.yaml ke sini
  // Contoh struktur:
  // "/api/v1/users/profile": {
  //   get: { ... }
  // }
};

export const jobApplicationDocs = {
  // Pindahkan content dari jobApplication.yaml ke sini
  // Contoh struktur:
  // "/api/v1/job-applications": {
  //   get: { ... },
  //   post: { ... }
  // }
};

export const userResumeDocs = {
  // Pindahkan content dari userResume.yaml ke sini
  // Contoh struktur:
  // "/api/v1/users/resume": {
  //   get: { ... },
  //   post: { ... }
  // }
};

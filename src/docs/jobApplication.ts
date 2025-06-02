// src/config/swaggerDocs.ts
export const jobApplicationDocs = {
  "/api/v1/job-applications": {
    post: {
      summary: "Create a job application",
      description: "Make a new work application note for authenticated users.",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "application_date",
                "job_position",
                "job_portal",
                "job_url",
                "company_name",
                "status_id",
              ],
              properties: {
                application_date: {
                  type: "string",
                  format: "date",
                  example: "2024-06-10",
                },
                job_position: {
                  type: "string",
                  example: "Frontend Developer",
                },
                job_portal: {
                  type: "string",
                  example: "LinkedIn",
                },
                job_url: {
                  type: "string",
                  format: "uri",
                  example: "https://www.linkedin.com/jobs/view/123456",
                },
                company_name: {
                  type: "string",
                  example: "PT Teknologi Hebat",
                },
                status_id: {
                  type: "integer",
                  example: 1,
                },
                notes: {
                  type: "string",
                  nullable: true,
                  example: "Send application via email HR",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Job application created successfully",
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
                    example: 201,
                  },
                  message: {
                    type: "string",
                    example: "Job application created successfully",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error creating job application",
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
                    example: "Error creating job application",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Get user's job applications",
      description:
        "Take all the user's job application data that is authenticated. Can be filtered based on`status_id`.",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "status_id",
          in: "query",
          required: false,
          schema: {
            type: "integer",
          },
          description: "Application filter based on ID status",
        },
      ],
      responses: {
        "200": {
          description: "The list of job applications was successfully taken",
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
                    example: "Job applications retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          example: 1,
                        },
                        application_date: {
                          type: "string",
                          format: "date",
                          example: "2024-06-10",
                        },
                        job_position: {
                          type: "string",
                          example: "Backend Developer",
                        },
                        job_portal: {
                          type: "string",
                          example: "Jobstreet",
                        },
                        job_url: {
                          type: "string",
                          format: "uri",
                          example: "https://jobstreet.co.id/job/view/123456",
                        },
                        company_name: {
                          type: "string",
                          example: "PT Solusi Cerdas",
                        },
                        status: {
                          type: "string",
                          example: "Interview",
                        },
                        status_id: {
                          type: "integer",
                          example: 2,
                        },
                        notes: {
                          type: "string",
                          nullable: true,
                          example: "Dijadwalkan wawancara tanggal 15",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "An error occurs when taking job applications data",
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
                    example: "Error fetching job applications",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/job-applications/{id}": {
    get: {
      summary: "Get a job application by ID",
      description:
        "Take details of the job application data based on the user's ID that is being logged in.",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID from the job application you want to take",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        "200": {
          description: "Job Application Details were successfully taken",
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
                    example: "Job application retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        example: 1,
                      },
                      application_date: {
                        type: "string",
                        format: "date",
                        example: "2024-06-10",
                      },
                      job_position: {
                        type: "string",
                        example: "Frontend Developer",
                      },
                      job_portal: {
                        type: "string",
                        example: "LinkedIn",
                      },
                      job_url: {
                        type: "string",
                        format: "uri",
                        example: "https://linkedin.com/jobs/view/123456",
                      },
                      company_name: {
                        type: "string",
                        example: "PT Teknologi Cerdas",
                      },
                      status: {
                        type: "string",
                        example: "Interview",
                      },
                      status_id: {
                        type: "integer",
                        example: 2,
                      },
                      notes: {
                        type: "string",
                        nullable: true,
                        example: "Proses seleksi tahap akhir",
                      },
                      status_history: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            changed_at: {
                              type: "string",
                              format: "date-time",
                              example: "2024-06-08T14:30:00Z",
                            },
                            status: {
                              type: "string",
                              example: "Applied",
                            },
                            status_id: {
                              type: "integer",
                              example: 1,
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
        },
        "404": {
          description: "Job Application Not Found",
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
                    example: "Job application not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
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
                    example: "Unexpected token error",
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      summary: "Update job application data",
      description: "Update job application data",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID from the job application you want to update",
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "application_date",
                "job_position",
                "job_portal",
                "job_url",
                "company_name",
                "status_id",
              ],
              properties: {
                application_date: {
                  type: "string",
                  format: "date",
                  example: "2024-06-10",
                },
                job_position: {
                  type: "string",
                  example: "Frontend Developer",
                },
                job_portal: {
                  type: "string",
                  example: "LinkedIn",
                },
                job_url: {
                  type: "string",
                  format: "uri",
                  example: "https://www.linkedin.com/jobs/view/123456",
                },
                company_name: {
                  type: "string",
                  example: "PT Teknologi Hebat",
                },
                status_id: {
                  type: "integer",
                  example: 1,
                },
                notes: {
                  type: "string",
                  nullable: true,
                  example: "Send application via email HR",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Job application updated successfully",
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
                    example: "Job application updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      application_date: {
                        type: "string",
                        format: "date",
                        example: "2024-06-10",
                      },
                      job_position: {
                        type: "string",
                        example: "Frontend Developer",
                      },
                      job_portal: {
                        type: "string",
                        example: "LinkedIn",
                      },
                      job_url: {
                        type: "string",
                        format: "uri",
                        example: "https://www.linkedin.com/jobs/view/123456",
                      },
                      company_name: {
                        type: "string",
                        example: "PT Teknologi Hebat",
                      },
                      status_id: {
                        type: "integer",
                        example: 1,
                      },
                      notes: {
                        type: "string",
                        nullable: true,
                        example: "Send application via email HR",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Job Application Not Found",
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
                    example: "Job application not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error update job application data",
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
                    example: "Error update job application data",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete job application data",
      description: "Delete a specific job application by ID",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID from the job application you want to delete",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        "200": {
          description: "Job application deleted successfully",
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
                    example: "Job application deleted successfully",
                  },
                  data: {
                    type: "null",
                    nullable: true,
                    example: null,
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Job Application Not Found",
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
                    example: "Job application not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error deleting job application data",
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
                    example: "Error deleting job application",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/job-applications/statuses": {
    get: {
      summary: "Get application statuses",
      description: "Retrieve all application statuses for dropdown menus",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Application statuses retrieved successfully",
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
                    example: "Application statuses retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          example: 1,
                        },
                        name: {
                          type: "string",
                          example: "Applied",
                        },
                      },
                    },
                    example: [
                      {
                        id: 1,
                        name: "Applied",
                      },
                      {
                        id: 2,
                        name: "Interview Scheduled",
                      },
                      {
                        id: 3,
                        name: "Rejected",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error fetching application statuses",
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
                    example: "Error fetching application statuses",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/job-applications/group-by-status": {
    get: {
      summary: "Get job application statistics",
      description:
        "Retrieve job application statistics grouped by status for the authenticated user",
      tags: ["Job Applications"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "Job application stats retrieved successfully",
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
                    example: "Job application stats retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      total_application: {
                        type: "integer",
                        example: 50,
                      },
                      apply: {
                        type: "integer",
                        example: 15,
                      },
                      screening: {
                        type: "integer",
                        example: 8,
                      },
                      interview_hr: {
                        type: "integer",
                        example: 5,
                      },
                      interview_hr_ii: {
                        type: "integer",
                        example: 3,
                      },
                      hr_test: {
                        type: "integer",
                        example: 2,
                      },
                      psychological_test: {
                        type: "integer",
                        example: 1,
                      },
                      interview_user: {
                        type: "integer",
                        example: 4,
                      },
                      interview_user_ii: {
                        type: "integer",
                        example: 2,
                      },
                      technical_test: {
                        type: "integer",
                        example: 3,
                      },
                      interview_C_level: {
                        type: "integer",
                        example: 1,
                      },
                      interview_C_level_ii: {
                        type: "integer",
                        example: 1,
                      },
                      interview_CEO: {
                        type: "integer",
                        example: 1,
                      },
                      ignored_by_company: {
                        type: "integer",
                        example: 2,
                      },
                      reject_cv: {
                        type: "integer",
                        example: 3,
                      },
                      reject_interview_hr: {
                        type: "integer",
                        example: 2,
                      },
                      reject_interview_user: {
                        type: "integer",
                        example: 1,
                      },
                      reject_hr_test: {
                        type: "integer",
                        example: 1,
                      },
                      reject_technical_test: {
                        type: "integer",
                        example: 1,
                      },
                      reject: {
                        type: "integer",
                        example: 4,
                      },
                      closed_vacancy: {
                        type: "integer",
                        example: 2,
                      },
                      success: {
                        type: "integer",
                        example: 3,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error fetching job application statistics",
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
                    example: "Error fetching job application stats",
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

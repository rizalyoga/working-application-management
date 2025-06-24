export const calendarDocs = {
  "/api/v1/schedule": {
    post: {
      summary: "Create a schedule",
      description: "Create a new schedule for authenticated users.",
      tags: ["Calendar"],
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
              required: ["title", "description", "date", "time"],
              properties: {
                title: {
                  type: "string",
                  example: "Interview User I",
                },
                description: {
                  type: "string",
                  nullable: true,
                  example: "Interview user in PT Telkom",
                },
                date: {
                  type: "string",
                  format: "date",
                  example: "2025-06-24",
                },
                time: {
                  type: "string",
                  format: "time",
                  example: "13:57:00",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Schedule created successfully",
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
                    example: "Schedule created successfully",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error creating new shedule",
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
                    example: "Error creating new shedule",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Get user schedules",
      description:
        "Take all the user's schedules data that is authenticated. .",
      tags: ["Calendar"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "The list of schedule was successfully taken",
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
                    example: "Schedule retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "11fe88b3-8973-44a4-8849-575ef4651aaa",
                        },
                        title: {
                          type: "string",
                          example: "Interview user",
                        },
                        description: {
                          type: "string",
                          example: "Interview User I Telkom",
                        },
                        date: {
                          type: "string",
                          format: "date",
                          example: "2025-06-24",
                        },
                        time: {
                          type: "string",
                          format: "time",
                          example: "13:57:00",
                        },
                        created_at: {
                          type: "string",
                          example: "2025-06-24T06:56:34.56966+00:00",
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
          description: "An error occurs when taking schedules data",
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
                    example: "Error fetching shedules data",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/v1/schedule/{id}": {
    get: {
      summary: "Get a schedule by ID",
      description:
        "Take details of the schedule data based on the user's ID that is being logged in.",
      tags: ["Calendar"],
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
          description: "ID from the schedule you want to take",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        "200": {
          description: "Schedule data were successfully taken",
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
                    example: "Schedule retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "11fe88b3-8973-44a4-8849-575ef4651aaa",
                        },
                        title: {
                          type: "string",
                          example: "Interview user",
                        },
                        description: {
                          type: "string",
                          example: "Interview User I Telkom",
                        },
                        date: {
                          type: "string",
                          format: "date",
                          example: "2025-06-24",
                        },
                        time: {
                          type: "string",
                          format: "time",
                          example: "13:57:00",
                        },
                        created_at: {
                          type: "string",
                          example: "2025-06-24T06:56:34.56966+00:00",
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
          description: "Schedule Not Found",
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
                    example: "Schedule not found",
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
      summary: "Update schedule data",
      description: "Update schedule data",
      tags: ["Calendar"],
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
          description: "ID from the schedule you want to update",
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
              required: ["title", "description", "date", "time"],
              properties: {
                title: {
                  type: "string",
                  example: "Interview User I",
                },
                description: {
                  type: "string",
                  nullable: true,
                  example: "Interview user in PT Telkom",
                },
                date: {
                  type: "string",
                  format: "date",
                  example: "2025-06-24",
                },
                time: {
                  type: "string",
                  format: "time",
                  example: "13:57:00",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Schedule data updated successfully",
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
                    example: "schedule updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "11fe88b3-8973-44a4-8849-575ef4651aaa",
                      },
                      title: {
                        type: "string",
                        example: "Interview user",
                      },
                      description: {
                        type: "string",
                        example: "Interview User I Telkom",
                      },
                      date: {
                        type: "string",
                        format: "date",
                        example: "2025-06-24",
                      },
                      time: {
                        type: "string",
                        format: "time",
                        example: "13:57:00",
                      },
                      created_at: {
                        type: "string",
                        example: "2025-06-24T06:56:34.56966+00:00",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Schedule Not Found",
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
                    example: "Schedule not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error update schedule data",
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
                    example: "Error update Shedule data",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete schedule data",
      description: "Delete a specific schedule by ID",
      tags: ["Calendar"],
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
          description: "ID from the schedule you want to delete",
          schema: {
            type: "integer",
          },
        },
      ],
      responses: {
        "200": {
          description: "Schedule deleted successfully",
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
                    example: "Schedule deleted successfully",
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
          description: "Schedule Not Found",
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
                    example: "Schedule not found",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Error deleting Schedule data",
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
                    example: "Error deleting Shcedule",
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

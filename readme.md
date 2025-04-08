# Job Application Tracker API

A RESTful API for tracking and managing job applications, built with Express.js, TypeScript and PostgreSQL (Supabase).

## Features

- **User Authentication**

  - Registration with email and phone number
  - Login with email/phone and password
  - JWT-based authentication with refresh tokens
  - Session management
  - Password change functionality

- **Job Application Management**
  - Create, read, update, and delete job applications
  - Track application statuses (apply, screening, interview HR, interview User, reject, success)
  - Filter job applications by status
  - Add notes to applications

## Tech Stack

- Node.js & Express.js
- TypeScript
- PostgreSQL (hosted on Supabase)
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
src/
├── config/         # Configuration files (Supabase, env, etc.)
├── controllers/    # Request handlers
├── middleware/     # Express middleware (auth, validation, etc.)
├── models/         # Data models and types
├── routes/         # API routes
├── utils/          # Utility functions
└── index.ts        # Application entry point
```

## Database Schema

The application uses the following database schema:

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL CHECK (phone_number LIKE '+62%'),
  password_hash VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Sessions Table

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Application Statuses Table

```sql
CREATE TABLE application_statuses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO application_statuses (name) VALUES
  ('apply'),
  ('screening'),
  ('interview HR'),
  ('interview User'),
  ('reject'),
  ('success');
```

### Job Applications Table

```sql
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  application_date DATE NOT NULL,
  job_position VARCHAR(100) NOT NULL,
  job_portal VARCHAR(100) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  status_id INTEGER NOT NULL REFERENCES application_statuses(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication

| Method | Endpoint                     | Description          | Request Body                              |
| ------ | ---------------------------- | -------------------- | ----------------------------------------- |
| POST   | `/api/v1/auth/register`      | Register a new user  | `{ name, email, phone_number, password }` |
| POST   | `/api/v1/auth/login`         | Login user           | `{ identifier, password }`                |
| POST   | `/api/v1/auth/logout`        | Logout user          | `{ refresh_token }`                       |
| POST   | `/api/v1/auth/refresh-token` | Get new access token | `{ refresh_token }`                       |

### Job Applications

| Method | Endpoint                            | Description                  | Request Body/Query                                                               |
| ------ | ----------------------------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| GET    | `/api/v1/job-applications`          | Get all user applications    | Query: `status_id` (optional)                                                    |
| GET    | `/api/v1/job-applications/:id`      | Get application by ID        | -                                                                                |
| POST   | `/api/v1/job-applications`          | Create a new application     | `{ application_date, job_position, job_portal, company_name, status_id, notes }` |
| PUT    | `/api/v1/job-applications/:id`      | Update an application        | Any fields to update                                                             |
| DELETE | `/api/v1/job-applications/:id`      | Delete an application        | -                                                                                |
| GET    | `/api/v1/job-applications/statuses` | Get all application statuses | -                                                                                |

### User

| Method | Endpoint                           | Description              | Request Body/Query                   |
| ------ | ---------------------------------- | ------------------------ | ------------------------------------ |
| PUT    | `/api/v1/user/change-password`     | Change user password     | `{ current_password, new_password }` |
| PUT    | `/api/v1/user/update-profile-data` | Change profile data user | Any fields to update                 |

## Authentication Flow

### Registration

1. User submits registration data
2. Server validates the data and hashes the password
3. User record is created in the database

### Login

1. User submits email/phone and password
2. Server validates credentials
3. If valid, generates access token and refresh token
4. Creates a session record with the refresh token
5. Returns tokens to the client

### Authentication

1. Client includes the access token in the Authorization header
2. Server validates the token signature
3. Server verifies that the user has an active session
4. If valid, allows access to protected resources

### Token Refresh

1. When access token expires, client sends refresh token
2. Server validates refresh token and session validity
3. Server generates new access and refresh tokens
4. Updates the session with the new refresh token
5. Returns new tokens to the client

### Password Change

1. User submits current password and new password
2. Server verifies the current password against the stored hash
3. If valid, server hashes the new password and updates the user record

## Example Usage

### Register User

```json
// POST /api/v1/auth/register
{
  "name": "User Testing",
  "email": "user@example.com",
  "phone_number": "+6281234567890",
  "password": "Password123!"
}
```

### Login

```json
// POST /api/v1/auth/login
{
  "identifier": "user@example.com",
  "password": "Password123!"
}
```

### Create Job Application

```json
// POST /api/v1/job-applications
// Header: Authorization: Bearer {access_token}
{
  "application_date": "2025-04-08",
  "job_position": "Senior Backend Developer",
  "job_portal": "LinkedIn",
  "company_name": "Tech Solutions Inc.",
  "status_id": 1,
  "notes": "Applied for remote position with competitive salary"
}
```

### Change Password

```json
// PUT /api/v1/user/change-password
// Header: Authorization: Bearer {access_token}
{
  "currentPassword": "Password123!",
  "newPassword": "NewPassword456!"
}
```

## Setup and Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd job-application-tracker-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file with the following variables:

   ```
   PORT=3000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   ```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "status": 400
  }
}
```

## Future Improvements

- Add user profile management
- Email verification
- Password reset functionality
- Application statistics and analytics
- Interview scheduling and reminders
- Export to PDF/CSV

## License

[MIT License](LICENSE)

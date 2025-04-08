export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  password_hash: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationStatus {
  id: number;
  name: string;
}

export interface JobApplication {
  id: string;
  user_id: string;
  application_date: string;
  job_position: string;
  job_portal: string;
  company_name: string;
  status_id: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

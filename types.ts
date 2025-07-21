export interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
}

export interface ParsedResume {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export interface Job {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  status: 'pending' | 'approved' | 'rejected';
  analysis: JobAnalysis | null;
}

export interface Application {
  job: Job;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offer Extended' | 'Closed';
  appliedDate: string;
}

export interface JobAnalysis {
    suggestedSkills: string[];
    suggestedCategory: string;
    clarityFeedback: string;
}

export interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string | null;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Job Seeker' | 'Employer';
  joinedDate: string;
}
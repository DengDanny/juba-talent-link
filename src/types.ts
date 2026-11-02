// Schema-aligned types mirroring the Supabase `seekers` and `jobs` tables.
// snake_case column names match the Postgres contract for a future cloud swap.

export interface JobSeeker {
  id: string;
  name: string;
  phone: string;
  city: string;
  skills: string[];
  rate?: string | null;
  bio: string;
  photo_url?: string | null;
  timestamp: string; // ISO string
}

export interface JobPosting {
  id: string;
  employer_name: string;
  phone: string;
  title: string;
  skill_needed: string;
  city: string;
  pay?: string | null;
  description: string;
  timestamp: string; // ISO string
}

export type ListingTab = "workers" | "jobs";

export type NewSeeker = Omit<JobSeeker, "id" | "timestamp" | "photo_url"> & {
  photo_url?: string | null;
};

export type NewJob = Omit<JobPosting, "id" | "timestamp">;
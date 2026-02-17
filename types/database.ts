export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: "admin" | "member" | "public";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: "admin" | "member" | "public";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: "admin" | "member" | "public";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blood_donors: {
        Row: {
          id: string;
          user_id: string;
          blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
          is_available: boolean;
          last_donation_date: string | null;
          contact_preference: "phone" | "email" | "both";
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
          is_available?: boolean;
          last_donation_date?: string | null;
          contact_preference?: "phone" | "email" | "both";
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          blood_group?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
          is_available?: boolean;
          last_donation_date?: string | null;
          contact_preference?: "phone" | "email" | "both";
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          image_url: string | null;
          author_id: string;
          category:
            | "announcement"
            | "event"
            | "sports"
            | "cultural"
            | "general";
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          image_url?: string | null;
          author_id: string;
          category?:
            | "announcement"
            | "event"
            | "sports"
            | "cultural"
            | "general";
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          image_url?: string | null;
          author_id?: string;
          category?:
            | "announcement"
            | "event"
            | "sports"
            | "cultural"
            | "general";
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      library_books: {
        Row: {
          id: string;
          title: string;
          author: string;
          category: string;
          isbn: string | null;
          description: string | null;
          cover_image_url: string | null;
          digital_file_url: string | null;
          total_copies: number;
          available_copies: number;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author: string;
          category: string;
          isbn?: string | null;
          description?: string | null;
          cover_image_url?: string | null;
          digital_file_url?: string | null;
          total_copies?: number;
          available_copies?: number;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          category?: string;
          isbn?: string | null;
          description?: string | null;
          cover_image_url?: string | null;
          digital_file_url?: string | null;
          total_copies?: number;
          available_copies?: number;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          company: string;
          location: string;
          job_type: "full-time" | "part-time" | "contract" | "temporary";
          salary_range: string | null;
          contact_name: string;
          contact_phone: string;
          contact_email: string | null;
          posted_by: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          company: string;
          location: string;
          job_type?: "full-time" | "part-time" | "contract" | "temporary";
          salary_range?: string | null;
          contact_name: string;
          contact_phone: string;
          contact_email?: string | null;
          posted_by: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          company?: string;
          location?: string;
          job_type?: "full-time" | "part-time" | "contract" | "temporary";
          salary_range?: string | null;
          contact_name?: string;
          contact_phone?: string;
          contact_email?: string | null;
          posted_by?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      workers: {
        Row: {
          id: string;
          name: string;
          services: string[];
          phone: string;
          email: string | null;
          experience_years: number;
          description: string | null;
          hourly_rate: number | null;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          services: string[];
          phone: string;
          email?: string | null;
          experience_years?: number;
          description?: string | null;
          hourly_rate?: number | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          services?: string[];
          phone?: string;
          email?: string | null;
          experience_years?: number;
          description?: string | null;
          hourly_rate?: number | null;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      videos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          video_url: string;
          thumbnail_url: string | null;
          category:
            | "educational"
            | "cultural"
            | "sports"
            | "tutorial"
            | "other";
          duration: number | null;
          views: number;
          uploaded_by: string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          video_url: string;
          thumbnail_url?: string | null;
          category?:
            | "educational"
            | "cultural"
            | "sports"
            | "tutorial"
            | "other";
          duration?: number | null;
          views?: number;
          uploaded_by: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          video_url?: string;
          thumbnail_url?: string | null;
          category?:
            | "educational"
            | "cultural"
            | "sports"
            | "tutorial"
            | "other";
          duration?: number | null;
          views?: number;
          uploaded_by?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type BloodDonorRow = Database["public"]["Tables"]["blood_donors"]["Row"];

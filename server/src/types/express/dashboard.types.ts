// src/types/dashboard.types.ts
export interface ResumeData {
  content: string;
  metadata?: {
    lastModified?: Date;
    version?: number;
  };
}

export interface JobDescription {
  content: string;
  position?: string;
  company?: string;
}

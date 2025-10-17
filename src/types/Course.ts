export interface CourseLearningOutcome {
  tags: string[];
  name: string;
  objective: string;
  activity: string;
  assessment: string;
  justification: string;
}

export interface Course {
  course_id: string;
  total_credits: number | number[]; 
  lab_hours: number | null;
  lecture_hours: number | null;
  description: string;
  name: string;
  long_name: string;
  effectiveEndDate?: string | null;
  effectiveStartDate?: string | null;
  courseTypicallyOffered?: string | null;
  note?: string | null;
  nonEnforcedPrerequisites?: string | null;
  recommended?: string | null;
  learningOutcomes?: CourseLearningOutcome[];
  requisites?: Record<string, any> | null;    
  id: string;
}

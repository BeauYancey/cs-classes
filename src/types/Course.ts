import type { LearningOutcome } from "./LearningOutcome";

export interface Course {
  code: string;
  name: string;
  credits: number | {lecture: number; lab: number};
  prerequisites: string[];
  description?: string;
  requiredForGraduation: boolean;
  upcomingOfferings: string[];
  learningOutcomes?: LearningOutcome[];
  tags: string[];
}
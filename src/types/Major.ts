export interface Program {
  // represents a major or minor
  name: string;
  requiredCourses: string[];
  electiveCourses: string[];
  totalCredits: number;
}
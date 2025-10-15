export interface GraduationPlan {
  // Only used for logged in users
  creditsCompleted: number;
  creditsRemaining: number;
  coreCoursesCompleted: string[];
  coreCoursesRemaining: string[];
  electiveCoursesCompleted: string[];
  electiveCoursesRemaining: string[];
  totalCreditsRequired: number;
  totalElectiveCreditsRequired: number;
  major: string;
  minor?: string;
  requirements: string[]
}
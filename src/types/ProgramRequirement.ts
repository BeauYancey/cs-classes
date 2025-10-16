export interface ProgramRequirement {
  title: string;
  description?: string;
  creditsMin: number;
  creditsMax: number;
  courses?: CourseSimple[];
  options?: ProgramRequirement[];
}

interface CourseSimple {
  code: string, 
  title: string, 
  credits: number
}
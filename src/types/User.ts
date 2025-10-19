import type { CourseSimple } from "./ProgramRequirement";

export interface User {
  name: string,
  program: string,
  completedCourses: CourseSimple[]
}
import type { ProgramRequirement, CourseSimple } from '../types/ProgramRequirement';

export function isRequirementMet(
  req: ProgramRequirement,
  completedCourses: CourseSimple[]
): boolean {
  // Accumulate total credits from matched courses
  let earnedCredits = 0;

  // Check direct course matches
  if (req.courses) {
    for (const course of req.courses) {
      if (completedCourses.some(c => c.code === course.code)) {
        earnedCredits += course.credits;
      }
    }
  }

  // Check nested sub-requirements (options)
  if (req.options) {
    for (const option of req.options) {
      if (option) {
        const isMet = isRequirementMet(option, completedCourses);
        if (isMet) {
          // Even if sub-requirement is met, we need to sum the credits it contributes
          // Recurse again to sum credits
          const { earnedCredits: subCredits } = getRequirementCredits(option, completedCourses);
          earnedCredits += subCredits;
        }
      }
    }
  }

  return earnedCredits >= req.creditsMin;
}

// Helper: Get total earned credits for a requirement (same logic as above)
export function getRequirementCredits(
  req: ProgramRequirement,
  completedCourses: CourseSimple[]
): { earnedCredits: number } {
  let earnedCredits = 0;

  if (req.courses) {
    for (const course of req.courses) {
      if (completedCourses.some(c => c.code === course.code)) {
        earnedCredits += course.credits;
      }
    }
  }

  if (req.options) {
    for (const option of req.options) {
      const { earnedCredits: subCredits } = getRequirementCredits(option, completedCourses);
      earnedCredits += subCredits;
    }
  }

  return { earnedCredits };
}

import type { ProgramRequirement } from "./ProgramRequirement";

export interface Program {
  // represents a major or minor
  name: string;
  requirements: ProgramRequirement[];
  creditsMin: number;
  creditsMax: number;
  type: "major" | "minor";
}
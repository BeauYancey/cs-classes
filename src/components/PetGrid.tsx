import { Grid } from "@mantine/core";
import ProgramCard from "./ProgramCard";
import type { Program } from "../types/Program";

interface ProgramGridProps {
  programs: Program[];
}

const ProgramGrid: React.FC<ProgramGridProps> = ({programs}) => {
  return (
    <Grid gutter="md">
      {programs.map(program => 
        <Grid.Col span={{base: 12, sm: 6, md: 4, lg: 3}} key={program.name}>
          <ProgramCard program={program} />
        </Grid.Col>
      )}
    </Grid>
  )
}

export default ProgramGrid;
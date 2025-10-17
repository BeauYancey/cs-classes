import { Group, Stack } from "@mantine/core";
import programs from "../data/programs.json";
import { useState } from "react";
import type { Program } from "../types/Program";
import ProgramCard from "../components/ProgramCard";

interface TabContentProps {
  isActiveTab?: boolean;
}

const ProgramsPage: React.FC<TabContentProps> = () => {
  const [selected, setSelected] = useState<Program | undefined>()

  return (
    <Group>
        <Stack gap="md" flex="1">
          {programs.map(prog => (
            <ProgramCard key={prog.name} program={prog as Program} onClick={() => setSelected(prog as Program)}/>
          ))}
        </Stack>
    </Group>
  );
}

export default ProgramsPage;
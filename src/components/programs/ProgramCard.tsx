import { Card, Stack, Title } from "@mantine/core";
import { Data } from "../Data";
import type { Program } from "../../types/Program";
import { ClockIcon, GraduationCapIcon } from "@phosphor-icons/react";
import type { MouseEventHandler } from "react";

interface ProgramCardProps {
  program: Program;
  onClick?: MouseEventHandler
}

const ProgramCard: React.FC<ProgramCardProps> = ({program, onClick}) => {

  return (
    <Card
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      onClick={onClick}
      style={{cursor: "pointer"}}
    >
      <Title order={3} mb="sm">{program.name}</Title>
      <Stack gap="0.25rem">
        <Data 
          label="Type" 
          value={program.type.charAt(0).toUpperCase() + program.type.slice(1)} 
          leftSection={<GraduationCapIcon size={16}/>} 
        />
        <Data 
          label="Credits" 
          value={`${program.creditsMin} - ${program.creditsMax}`} 
          leftSection={<ClockIcon size={16}/>} 
        />
      </Stack>
    </Card>
  );
}

export default ProgramCard;
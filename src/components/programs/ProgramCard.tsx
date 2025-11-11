import { Card, Stack, Title, useMantineTheme } from "@mantine/core";
import { Data } from "../Data";
import type { Program } from "../../types/Program";
import { ClockIcon, GraduationCapIcon } from "@phosphor-icons/react";
import type { MouseEventHandler } from "react";

interface ProgramCardProps {
  program: Program;
  onClick?: MouseEventHandler;
  focus?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({program, onClick, focus}) => {
  const theme = useMantineTheme();

  return (
    <Card
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      onClick={onClick}
      bg={focus ? "rgb(230, 235, 250)" : undefined}
      style={{cursor: "pointer", transition: 'background-color 0.2s ease'}}
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
import { Card, Stack, Title, Image } from "@mantine/core";
import { Data } from "./Data";
import type { Program } from "../types/Program";
import { ClockIcon, GraduationCapIcon } from "@phosphor-icons/react";

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({program}) => {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder flex="1 0 16rem">
      <Card.Section>
          <Image 
            src={""} 
            style={{ objectFit: "cover", height: "12rem", width: "100%" }}
          />
      </Card.Section>

      <Title order={3} my="xs">{program.name}</Title>
      <Stack gap="0.25rem">
        <Data 
          label="Type" 
          value={program.type} 
          leftSection={<GraduationCapIcon size={16}/>} 
        />
        <Data 
          label="Adoption Fee" 
          value={`${program.creditsMin} - ${program.creditsMax} credits`} 
          leftSection={<ClockIcon size={16}/>} 
        />
      </Stack>
    </Card>
  );
}

export default ProgramCard;
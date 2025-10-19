import { Divider, Stack, Text, Title } from "@mantine/core"
import { capitalize, getRange } from "../utils/stringUtils"
import RequirementsBlock from "../components/gradPlan/RequirementsBlock"
import type { User } from "../types/User"
import programs from "../data/programs.json"
import type { Program } from "../types/Program"

interface GradPlanPageProps {
  user?: User
}

const GradPlanPage: React.FC<GradPlanPageProps> = ({user}) => {
  if (!user) {
    <Text c="error">Please log in to view your graduation plan.</Text>;
  }

  const program = programs.find(p => p.name === user?.program) as Program;

  return (
    <Stack w="100%" h="100%" gap="lg" mb="sm">
      <Stack>
        <Title order={2}>{program?.name ?? "Select a program"}</Title>
        <Text>{capitalize(program?.type)} • {getRange(program?.creditsMin, program?.creditsMax)} credits</Text>
      </Stack>
      
      <Stack gap="xs">
        <Divider label="Requirements" labelPosition="left" />
        <Stack>
          {program?.requirements.map((req, i) => (
            <RequirementsBlock key={i} req={req} depth={0} completedCourses={user!.completedCourses}/>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default GradPlanPage;
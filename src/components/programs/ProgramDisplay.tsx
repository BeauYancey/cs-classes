import { Divider, Stack, Text, Title } from "@mantine/core"
import type { Program } from "../../types/Program"
import { capitalize, getRange } from "../../utils/stringUtils"
import RequirementsBlock from "./RequirementsBlock"

interface ProgramDisplayProps {
  program?: Program
}

const ProgramDisplay: React.FC<ProgramDisplayProps> = ({program}) => {
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
            <RequirementsBlock key={i} req={req} depth={0}/>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProgramDisplay
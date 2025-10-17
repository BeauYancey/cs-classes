import { Tabs, Title, Text, Group, useMantineTheme } from "@mantine/core"
import { GraduationCapIcon, PathIcon, ChalkboardSimpleIcon, TargetIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import ProgramsPage from "./pages/ProgramsPage";
import Courses from "./components/Courses/Courses"

function App() {
  const [activeTab, setActiveTab] = useState<string | null>("courses")
  const theme = useMantineTheme();

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab])

  return (
    <main>
      <Title order={1} mb="md">BYU Computer Science Department</Title>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List mb="md" pos="sticky" top={0} bg={theme.white} style={{zIndex: 20}} >
          <Tabs.Tab value="courses" bg={activeTab === "courses" ? theme.colors.royal[0] : undefined}><Group gap="xs">
            <ChalkboardSimpleIcon size={22} />
            <Title order={4}>Courses</Title>    
          </Group></Tabs.Tab>

          <Tabs.Tab value="programs" bg={activeTab === "programs" ? theme.colors.royal[0] : undefined}><Group gap="xs">
            <PathIcon size={22} />
            <Title order={4}>Programs</Title>
          </Group></Tabs.Tab>

          <Tabs.Tab value="grad-plan" bg={activeTab === "grad-plan" ? theme.colors.royal[0] : undefined}><Group gap="xs">
            <GraduationCapIcon size={22} />
            <Title order={4}>Graduation Plan</Title>
          </Group></Tabs.Tab>

          <Tabs.Tab value="outcomes" bg={activeTab === "outcomes" ? theme.colors.royal[0] : undefined}><Group gap="xs">
            <TargetIcon size={22} />
            <Title order={4}>Learning Outcomes</Title>
          </Group></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="courses">
          <Courses />
        </Tabs.Panel>

        <Tabs.Panel value="programs">
          <ProgramsPage isActiveTab={activeTab === "programs"}/>
        </Tabs.Panel>

        <Tabs.Panel value="grad-plan">
          <Text>Graduation Plan</Text>
        </Tabs.Panel>

        <Tabs.Panel value="outcomes">
          <Text>Learning Outcomes Page</Text>
        </Tabs.Panel>
      </Tabs>
    </main>
  )
}

export default App

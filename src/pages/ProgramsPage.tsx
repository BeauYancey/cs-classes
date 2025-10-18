import { Box, Flex, Group, ScrollArea, Select, Stack, TextInput } from "@mantine/core";
import allPrograms from "../data/programs.json";
import { useEffect, useRef, useState } from "react";
import type { Program } from "../types/Program";
import ProgramCard from "../components/ProgramCard";
import ProgramDisplay from "../components/ProgramDisplay";

interface ProgramsPageProps {
  isActiveTab: boolean
}

const ProgramsPage: React.FC<ProgramsPageProps> = ({isActiveTab}) => {
  const [programs, setPrograms] = useState<Program[]>(allPrograms as Program[])
  const [selected, setSelected] = useState<Program | undefined>();
  const boxRef = useRef<HTMLDivElement>(null);
  const displayScrollRef = useRef<HTMLDivElement>(null)
  const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px")

  useEffect(() => {
    // Scroll to top when new program is selected
    if (displayScrollRef.current) {
      displayScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  useEffect(() => {
    // Set scroll-area height
    if (isActiveTab) {
      setScrollAreaHeight(boxRef.current ? `calc(100vh - ${boxRef.current?.getBoundingClientRect().top}px)` : "0px")
    }
  }, [boxRef, isActiveTab])

  return (
    <Stack>
      <Group px="lg">
        <TextInput label="Filter by name" />
        <Select label="Filter by type" />
        <TextInput label="Filter by credits" />
      </Group>

      <Flex w="100%" style={{ transition: "all 0.3s ease" }}>
        {/* Left pane: Scrollable list */}
        <Box
          w={selected ? "40%" : "100%"}
          style={{ transition: "width 0.3s ease" }}
          ref={boxRef}
        >
          <ScrollArea h={scrollAreaHeight} px="md">
            <Stack gap="md" mb="sm">
              {programs.map((prog) => (
                <ProgramCard
                  key={prog.name}
                  program={prog as Program}
                  onClick={() =>
                    setSelected((prev) =>
                      prev?.name === prog.name ? undefined : (prog as Program)
                    )
                  }
                />
              ))}
            </Stack>
          </ScrollArea>
        </Box>

        {/* Right pane: Program detail */}
        {selected && (
          <Box w="60%" px="md" bg="white" style={{ overflowY: "auto" }} mah={scrollAreaHeight}>
            <ScrollArea viewportRef={displayScrollRef} h={scrollAreaHeight} px="md">
              <ProgramDisplay program={selected} />
            </ScrollArea>
          </Box>
        )}
      </Flex>
    </Stack>
  );
};

export default ProgramsPage;

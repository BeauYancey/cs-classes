import { Box, Flex, ScrollArea, Stack } from "@mantine/core";
import programs from "../data/programs.json";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Program } from "../types/Program";
import ProgramCard from "../components/ProgramCard";
import ProgramDisplay from "../components/ProgramDisplay";

const ProgramsPage: React.FC = () => {
  const [selected, setSelected] = useState<Program | undefined>();
  const boxRef = useRef<HTMLDivElement>(null);
  const displayScrollRef = useRef<HTMLDivElement>(null)
  const scrollAreaHeight = useMemo(
    (() => boxRef.current ? `calc(100vh - ${boxRef.current?.getBoundingClientRect().top}px` : 0),
    [boxRef.current]
  );

  useEffect(() => {
    console.log("detected a change")
    if (displayScrollRef.current) {
      console.log("trying to scroll")
      displayScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  return (
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
  );
};

export default ProgramsPage;

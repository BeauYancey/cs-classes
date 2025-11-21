import { Box, Flex, Group, ScrollArea, Select, Stack, TextInput } from "@mantine/core";
import allPrograms from "../data/programs.json";
import { useEffect, useRef, useState } from "react";
import type { Program } from "../types/Program";
import ProgramCard from "../components/programs/ProgramCard";
import ProgramDisplay from "../components/programs/ProgramDisplay";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";

interface ProgramsPageProps {
  isActiveTab: boolean
}

const ProgramsPage: React.FC<ProgramsPageProps> = ({isActiveTab}) => {
  const [programs, setPrograms] = useState<Program[]>(allPrograms as Program[]);
  const [selected, setSelected] = useState<Program | undefined>();

  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"Major" | "Minor" | null>(null);
  const [creditFilter, setCreditFilter] = useState<string>("");
  const [sort, setSort] = useState<"Credits" | "Name" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");


  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState("0px");
  const [rightHeight, setRightHeight] = useState("0px");


  useEffect(() => {
    // Scroll to top when new program is selected
    if (rightRef.current) {
      rightRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  useEffect(() => {
    if (!isActiveTab) return;

    // Left scroll area: subtract the distance from top because filters are above it
    if (leftRef.current) {
      const top = leftRef.current.getBoundingClientRect().top;
      setLeftHeight(`calc(100vh - ${top}px - var(--mantine-spacing-sm))`);
    }

    // Right scroll area: full screen height, no offset
    if (rightRef.current) {
      const top = rightRef.current.getBoundingClientRect().top;
      setRightHeight(`calc(100vh - ${top}px - var(--mantine-spacing-sm))`);
    }
  }, [isActiveTab, selected]);


  useEffect(() => {
    let result = [...allPrograms] as Program[];

    if (nameFilter) {
      result = result.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }
    if (typeFilter) {
      result = result.filter(p => p.type.toLowerCase() == typeFilter.toLowerCase());
    }
    if (creditFilter) {
      result = result.filter(p => p.creditsMax <= parseFloat(creditFilter));
    }

    if (sort) {
      result.sort((a, b) => {
        if (sort === "Name") {
          return sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sort === "Credits") {
          return sortDirection === "asc" ? a.creditsMin - b.creditsMin : b.creditsMin - a.creditsMin;
        }
        return 0
      });
    }

    setPrograms(result);

  }, [nameFilter, typeFilter, creditFilter, sort, sortDirection])

  const Filters = (
    <Group px="lg" justify="space-between" gap="xs">
      <Group gap="sm" wrap="nowrap">
        <TextInput 
          label="Filter by name" 
          value={nameFilter} 
          onChange={(event) => setNameFilter(event.currentTarget.value)}
        />
        <Select 
          label="Filter by type" 
          data={["Major", "Minor"]} 
          value={typeFilter} 
          onChange={(value) => setTypeFilter(value as "Major" | "Minor" | null)}
        />
        <TextInput 
          label="Filter by max credits"  
          type="number" 
          value={creditFilter?.toString()}
          onChange={(event) => setCreditFilter(event.currentTarget.value)}
        />
      </Group>

      <Select
        label="Sort by"
        data={["Name", "Credits"]}
        leftSection={
          sort
            ? sortDirection === "asc"
              ? <ArrowUpIcon style={{cursor: "pointer"}} weight="bold" onClick={() => setSortDirection("desc")}/>
              : <ArrowDownIcon style={{cursor: "pointer"}} weight="bold" onClick={() => setSortDirection("asc")}/>
            : null
        }
        value={sort}
        onChange={(value) => setSort(value as "Credits" | "Name" | null)}
      />
    </Group>
  );

  return (
    <Flex w="100%" style={{ transition: "all 0.3s ease" }}>
      {/* Left pane: Scrollable list */}
      <Box
        w={selected ? "40%" : "100%"}
        style={{ transition: "width 0.3s ease" }}
      >
        {Filters}
        <ScrollArea h={leftHeight} px="md" mt="sm" viewportRef={leftRef}>
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
                focus={selected?.name === prog.name}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Box>

      {/* Right pane: Program detail */}
      {selected && (
        <Box w="60%" px="md" bg="white" style={{ overflow: "hidden" }}>
          <ScrollArea viewportRef={rightRef} h={rightHeight} px="md">
            <ProgramDisplay program={selected} />
          </ScrollArea>
        </Box>
      )}
    </Flex>
  );
};

export default ProgramsPage;

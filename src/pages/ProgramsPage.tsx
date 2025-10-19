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


  const boxRef = useRef<HTMLDivElement>(null);
  const displayScrollRef = useRef<HTMLDivElement>(null);
  const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

  useEffect(() => {
    // Scroll to top when new program is selected
    if (displayScrollRef.current) {
      displayScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  useEffect(() => {
    // Set scroll-area height
    if (isActiveTab) {
      setScrollAreaHeight(boxRef.current ? `calc(100vh - ${boxRef.current?.getBoundingClientRect().top}px)` : "0px");
    }
  }, [boxRef, isActiveTab]);

  useEffect(() => {
    let result = [...allPrograms] as Program[];
    console.log(nameFilter)

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

  return (
    <Stack>
      <Group px="lg" justify="space-between">
        <Group>
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

import formatted_courses from "../../data/formatted_courses.json";
import extra_course_info from "../../data/extra_course_info.json";
import CourseGrid from "./CourseGrid";
import type { Course } from "../../types/Course";
import { useEffect, useRef, useState, useMemo } from "react";
import { TextInput, Box, Flex, ScrollArea, Stack, NavLink } from "@mantine/core";
import CourseDisplay from "./CourseDisplay";

interface CoursesProps {
  isActiveTab?: boolean;
}

export default function Courses({ isActiveTab = true }: CoursesProps) {
  const [textFilter, setTextFilter] = useState("");
  const [creditFilter, setCreditFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [levelInView, setLevelInView] = useState<string>("100");

  const boxRef = useRef<HTMLDivElement>(null);
  const displayScrollRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

  useEffect(() => {
    // Scroll to top when new course is selected
    if (displayScrollRef.current) {
      displayScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCourse]);

  useEffect(() => {
    // Set scroll-area height
    if (isActiveTab) {
      setScrollAreaHeight(boxRef.current ? `calc(100vh - ${boxRef.current?.getBoundingClientRect().top}px)` : "0px");
    }
  }, [boxRef, isActiveTab]);

  // Get available course levels
  const courseLevels = useMemo(() => {
    const levels = new Set<string>();
    extra_course_info.forEach((course) => {
      // Extract course number from course_id (e.g., "C S 110" -> "110")
      const match = course.course_id.match(/\d+/);
      if (match) {
        const courseNum = parseInt(match[0]);
        const level = Math.floor(courseNum / 100) * 100;
        levels.add(level.toString());
      }
    });
    return Array.from(levels).sort((a, b) => parseInt(a) - parseInt(b));
  }, []);

  // Filter courses based on all filters
  const filteredCourses = extra_course_info.filter((course) => {
    const matchesCode = course.course_id.toLowerCase().includes(textFilter.toLowerCase());
    const matchesCredits =
      creditFilter === "" || course.total_credits === Number(creditFilter);
    const matchesName =
      nameFilter === "" ||
      course.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      course.long_name.toLowerCase().includes(nameFilter.toLowerCase());
    
    return matchesCode && matchesCredits && matchesName;
  });

  // Group courses by level for display
  const groupedCourses = useMemo(() => {
    const groups: { [key: string]: Course[] } = {};
    filteredCourses.forEach((course) => {
      const match = course.course_id.match(/\d+/);
      if (match) {
        const courseNum = parseInt(match[0]);
        const level = Math.floor(courseNum / 100) * 100;
        const levelKey = level.toString();
        if (!groups[levelKey]) {
          groups[levelKey] = [];
        }
        groups[levelKey].push(course);
      }
    });
    return groups;
  }, [filteredCourses]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const viewportHeight = viewport.clientHeight;

      Object.keys(groupedCourses).forEach(level => {
        const levelSection = document.getElementById(`level-${level}`);
        if (!levelSection) return;

        const rect = levelSection.getBoundingClientRect();
        const relativeTop = rect.top - viewportRect.top;
        const relativeBottom = rect.bottom - viewportRect.top;

        if (relativeTop < viewportHeight * 0.3 && relativeBottom > viewportHeight * 0.3) {
          // level is in view
          setLevelInView(level)
        }
      })
    }

    viewport.addEventListener('scroll', onScroll, true);
    onScroll();
    return () => viewportRef.current?.removeEventListener('scroll', onScroll);
  }, [groupedCourses, viewportRef]);

  const scrollToLevel = (level: string) => {
    const scrollAnchor = document.getElementById(`scroll-${level}`);
    if (scrollAnchor) {
      scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' } );
    }
  }

  return (
    <Stack>
      <Box px="lg" py="sm" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <TextInput
          label="Search by Course Code"
          placeholder="e.g., C S 110"
          value={textFilter}
          onChange={(event) => setTextFilter(event.currentTarget.value)}
          style={{ maxWidth: 300 }}
        />
        <TextInput
          label="Search by Credit Amount"
          placeholder="e.g., 3"
          value={creditFilter}
          onChange={(event) => setCreditFilter(event.currentTarget.value)}
          style={{ maxWidth: 300 }}
        />
        <TextInput
          label="Search by Name"
          placeholder="e.g., How to Program"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.currentTarget.value)}
          style={{ flex: 1, maxWidth: 300 }}
        />
      </Box>

      <Flex w="100%" style={{ transition: "all 0.3s ease" }}>
        {/* Sidebar for course levels - always visible */}
        <Box w="100px" style={{ flexShrink: 0 }}>
          <ScrollArea h={scrollAreaHeight}>
            <Stack gap="xs" p="xs">
              {courseLevels.map(level => (
                <NavLink
                  key={level}
                  label={`${level}s`}
                  onClick={() => scrollToLevel(level)}
                  style={{ cursor: 'pointer' }}
                  active={levelInView === level}
                />
              ))}
            </Stack>
          </ScrollArea>
        </Box>

        {/* Main course grid */}
        <Box
          w={selectedCourse ? "55%" : "100%"}
          style={{ transition: "width 0.3s ease", flex: 1 }}
          ref={boxRef}
        >
          <ScrollArea h={scrollAreaHeight} viewportRef={viewportRef} px="md">
              <Stack gap="xl">
                {Object.keys(groupedCourses)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(level => (
                    <Box key={level}>
                      <Box 
                        style={{ 
                          position: 'sticky', 
                          top: 0, 
                          backgroundColor: 'white', 
                          zIndex: 10,
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: 'var(--mantine-color-gray-6)'
                        }}
                      >
                        {level}s Level
                      </Box>
                      <CourseGrid 
                        courses={groupedCourses[level]} 
                        selectedCourse={selectedCourse} 
                        setSelectedCourse={setSelectedCourse} 
                        level={level}
                      />
                    </Box>
                  ))}
              </Stack>
            {/* )} */}
          </ScrollArea>
        </Box>

        {/* Right pane: Course detail */}
        {selectedCourse && (
          <Box w="45%" px="md" bg="white" style={{ overflowY: "auto" }} mah={scrollAreaHeight}>
            <ScrollArea viewportRef={displayScrollRef} h={scrollAreaHeight} px="md">
              <CourseDisplay course={selectedCourse} />
            </ScrollArea>
          </Box>
        )}
      </Flex>
    </Stack>
  );
}
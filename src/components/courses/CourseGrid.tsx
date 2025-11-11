import CourseCard from "./CourseCard";
import { Grid } from "@mantine/core";
import type { Course } from "../../types/Course";

interface CourseGridProps {
  courses: Course[];
  selectedCourse: Course | undefined;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
  level: string
}

export default function CourseGrid({ courses, selectedCourse, setSelectedCourse, level }: CourseGridProps) {
  return (
    <Grid gutter="md" pos="relative" id={`level-${level}`}>
      <div style={{position: "absolute", top: "-39px"}} id={`scroll-${level}`}>{/* This is just here for the scroll to lock onto something */}</div>
      {courses.map((course) => (
        <Grid.Col 
          span={selectedCourse ? 6 : 4} 
          key={course.course_id}
        >
          <CourseCard course={course} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

import CourseCard from "./CourseCard";
import { Grid } from "@mantine/core";
import type { Course } from "../../types/Course";

interface CourseGridProps {
  courses: Course[];
  selectedCourse: Course | undefined;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
}

export default function CourseGrid({ courses, selectedCourse, setSelectedCourse }: CourseGridProps) {
  return (
    <Grid gutter="md">
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

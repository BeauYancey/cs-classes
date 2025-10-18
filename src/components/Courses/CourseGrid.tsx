import CourseCard from "./CourseCard";
import { Grid } from "@mantine/core";
import type { Course } from "../../types/Course";

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <Grid gutter="md">
      {courses.map((course) => (
        <Grid.Col span={12} key={course.course_id}>
          <CourseCard course={course} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

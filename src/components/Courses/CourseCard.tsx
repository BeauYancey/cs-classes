import type { Course } from "../../types/Course";
import { Card, Title, Group, Divider, Text } from "@mantine/core";

interface CourseCardProps {
  course: Course;
  selectedCourse: Course | undefined;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
}

export default function CourseCard({ course, selectedCourse, setSelectedCourse }: CourseCardProps) {
  const reqList = Array.isArray(course.requisites)
    ? course.requisites
    : [];
  const isSelected = selectedCourse?.course_id === course.course_id;

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      h="100%"
      onClick={() => setSelectedCourse(isSelected ? undefined : course)}
      style={{ 
        cursor: 'pointer',
        backgroundColor: isSelected ? 'var(--mantine-color-blue-light)' : undefined,
        transition: 'background-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Title order={3} my="xs">
        {course.course_id} - {course.name}
      </Title>
      
      <Divider my="sm" /> 
      
      <Group gap="md" wrap="wrap" style={{ fontSize: '0.875rem', color: 'var(--mantine-color-dimmed)' }}>
        <Text size="sm">Credits: {course.total_credits}</Text>
        <Text size="sm">Lab: {course.lab_hours}</Text>
        <Text size="sm">Lecture: {course.lecture_hours}</Text>
        <Text size="sm">{course.courseTypicallyOffered}</Text>
      </Group>
    </Card>
  );
}
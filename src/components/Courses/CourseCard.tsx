import type { Course } from "../../types/Course";
import { Card, Stack, Title, Group, Text, Divider, SimpleGrid } from "@mantine/core";
import formatted_courses from "../../data/formatted_courses.json";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const reqList = Array.isArray(course.requisites)
    ? course.requisites
    : [];
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder flex="1 0 16rem">
      <Title order={3} my="xs">
        {course.course_id} - {course.name}
      </Title>
      <Stack gap="0.25rem">
        <Group gap="xs">
          <Text>{course.description}</Text>
        </Group>
      </Stack>
      <Divider my="sm" /> 
      <SimpleGrid cols={4} spacing="sm">
        <Text>Total Credits: {course.total_credits}</Text>
        <Text>Lab Hours: {course.lab_hours}</Text>
        <Text>Lecture Hours: {course.lecture_hours}</Text>
        <Text>Offered: {course.courseTypicallyOffered} </Text>
      </SimpleGrid>
      {course.note && (
        <Text dangerouslySetInnerHTML={{ __html: course.note }} />
      )}
      {course.recommended && (
        <Text dangerouslySetInnerHTML={{ __html: course.recommended }} />
      )}
      {course.nonEnforcedPrerequisites && (
        <Text dangerouslySetInnerHTML={{ __html: course.nonEnforcedPrerequisites }} />
      )}
      {course.requisites && Object.keys(course.requisites).length > 0 && (
        <Text>Requisites: {reqList.length > 0 ? reqList.join(', ') : "None"}</Text>
      )}
    </Card>
  );
}

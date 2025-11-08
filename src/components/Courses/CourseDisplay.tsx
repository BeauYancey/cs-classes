// CourseDisplay.tsx
import { Stack, Title, Text, Divider, Group, Badge, List } from "@mantine/core";
import type { Course } from "../../types/Course";

interface CourseDisplayProps {
  course: Course;
}

export default function CourseDisplay({ course }: CourseDisplayProps) {
  const reqList = Array.isArray(course.requisites) ? course.requisites : [];

  return (
    <Stack gap="md" py="md">
      <Title order={2}>
        {course.course_id} - {course.name}
      </Title>
      
      {course.long_name && course.long_name !== course.name && (
        <Title order={4} c="dimmed">{course.long_name}</Title>
      )}

      <Divider />

      <Text size="lg">{course.description}</Text>

      <Divider />

      <Group>
        <Badge size="lg" variant="light">Total Credits: {course.total_credits}</Badge>
        <Badge size="lg" color="blue" variant="light">Lab Hours: {course.lab_hours}</Badge>
        <Badge size="lg" color="cyan" variant="light">Lecture Hours: {course.lecture_hours}</Badge>
        <Badge size="lg" color="green" variant="light">Offered: {course.courseTypicallyOffered}</Badge>
      </Group>

      {course.note && (
        <>
          <Divider />
          <div>
            <Title order={4}>Note</Title>
            <Text dangerouslySetInnerHTML={{ __html: course.note }} />
          </div>
        </>
      )}

      {course.recommended && (
        <>
          <Divider />
          <div>
            <Title order={4}>Recommended</Title>
            <Text dangerouslySetInnerHTML={{ __html: course.recommended }} />
          </div>
        </>
      )}

      {course.nonEnforcedPrerequisites && (
        <>
          <Divider />
          <div>
            <Title order={4}>Non-Enforced Prerequisites</Title>
            <Text dangerouslySetInnerHTML={{ __html: course.nonEnforcedPrerequisites }} />
          </div>
        </>
      )}

      {course.requisites && Object.keys(course.requisites).length > 0 && (
        <>
          <Divider />
          <div>
            <Title order={4}>Prerequisites</Title>
            <Text>{reqList.length > 0 ? reqList.join(', ') : "None"}</Text>
          </div>
        </>
      )}

      {course.learningOutcomes && course.learningOutcomes.length > 0 && (
        <>
          <Divider />
          <div>
            <Title order={4}>Learning Outcomes</Title>
            <List spacing="sm" mt="sm">
              {course.learningOutcomes.map((outcome, index) => (
                <List.Item key={index}>
                  <Text fw={500}>{outcome.name}</Text>
                  <Text size="sm" c="dimmed">{outcome.objective}</Text>
                </List.Item>
              ))}
            </List>
          </div>
        </>
      )}
    </Stack>
  );
}
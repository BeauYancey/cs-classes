// CourseDisplay.tsx
import { Stack, Title, Text, Divider, Group, Badge, List, Paper } from "@mantine/core";
import type { Course } from "../../types/Course";

interface CourseDisplayProps {
  course: Course;
}

export default function CourseDisplay({ course }: CourseDisplayProps) {
  const reqList = Array.isArray(course.requisites) ? course.requisites : [];

  return (
    <Stack gap="md" py="md">
      <Title order={2} c="navy.7">
        {course.course_id} - {course.name}
      </Title>
      
      {course.long_name && course.long_name !== course.name && (
        <Title order={4} c="dimmed">{course.long_name}</Title>
      )}

      <Divider />

      <Text size="lg">{course.description}</Text>

      <Divider />
      <Group>
        <Badge size="lg" color="indigo" variant="light">
          Total Credits: {course.total_credits}
        </Badge>
        <Badge size="lg" color="violet" variant="light">
          Lab Hours: {course.lab_hours}
        </Badge>
        <Badge size="lg" color="grape" variant="light">
          Lecture Hours: {course.lecture_hours}
        </Badge>
        <Badge size="lg" color="cyan" variant="light">
          Offered: {course.courseTypicallyOffered}
        </Badge>
      </Group>

      {course.note && (
        <>
          <Divider  />
          <Paper p="md" radius="md" bg="royal.0" withBorder>
            <Title order={4} c="navy.7" mb="xs">Note</Title>
            <Text dangerouslySetInnerHTML={{ __html: course.note }} />
          </Paper>
        </>
      )}

      {course.recommended && (
        <>
          <Divider />
          <Paper p="md" radius="md" bg="lightBlue.0" withBorder>
            <Title order={4} c="navy.7" mb="xs">Recommended</Title>
            <Text dangerouslySetInnerHTML={{ __html: course.recommended }} />
          </Paper>
        </>
      )}

      {course.nonEnforcedPrerequisites && (
        <>
          <Divider />
          <Paper p="md" radius="md" bg="gray.0" withBorder>
            <Title order={4} c="navy.7" mb="xs">Non-Enforced Prerequisites</Title>
            <Text dangerouslySetInnerHTML={{ __html: course.nonEnforcedPrerequisites }} />
          </Paper>
        </>
      )}

      {course.requisites && Object.keys(course.requisites).length > 0 && (
        <>
          <Divider />
          <Paper p="md" radius="md" bg="yellow.0" withBorder style={{ borderColor: 'var(--mantine-color-yellow-3)' }}>
            <Title order={4} c="navy.7" mb="xs">Prerequisites</Title>
            <Text>{reqList.length > 0 ? reqList.join(', ') : "None"}</Text>
          </Paper>
        </>
      )}

      {course.learningOutcomes && course.learningOutcomes.length > 0 && (
        <>
          <Divider />
          <Paper p="md" radius="md" bg="teal.0" withBorder>
            <Title order={4} c="navy.7" mb="xs">Learning Outcomes</Title>
            <List spacing="sm" mt="sm">
              {course.learningOutcomes.map((outcome, index) => (
                <List.Item key={index}>
                  <Text fw={500} c="teal.8">{outcome.name}</Text>
                  <Text size="sm" c="dimmed">{outcome.objective}</Text>
                </List.Item>
              ))}
            </List>
          </Paper>
        </>
      )}
    </Stack>
  );
}
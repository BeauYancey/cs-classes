import { Box, Stack, Text, Title, List, Group, useMantineTheme } from '@mantine/core';
import type { CourseSimple, ProgramRequirement } from '../../types/ProgramRequirement';
import { CheckCircleIcon, CircleIcon, ClockCountdownIcon, MinusCircleIcon } from '@phosphor-icons/react';
import { getRequirementCredits, isRequirementMet } from '../../utils/gradPlanUtils';

interface RequirementBlockProps {
  req: ProgramRequirement;
  depth?: number;
  completedCourses: CourseSimple[];
}

const RequirementBlock: React.FC<RequirementBlockProps> = ({ req, depth = 0, completedCourses }) => {
  const theme = useMantineTheme();

  const indent = depth * 12;

  const Icon = isRequirementMet(req, completedCourses)
    ? <CheckCircleIcon weight="fill" size={20} color={theme.colors.royal[5]}/>
    : getRequirementCredits(req, completedCourses).earnedCredits > 0
      ? <ClockCountdownIcon weight="duotone" size={20} color={theme.colors.royal[5]} />
      : <MinusCircleIcon weight="bold" size={20} color={theme.colors.royal[5]} />

  return (
    <Box pl={indent}>
      <Stack gap={4}>
        <Group gap="xs">
          {Icon}
          <Title order={depth < 2 ? 4 : 5}>{req.title}</Title>
        </Group>

        {req.description && (
          <Text size="sm" color="dimmed">
            {req.description}
          </Text>
        )}

        <Text size="sm" fw={500}>
          Credits: {req.creditsMin}
          {req.creditsMax !== req.creditsMin ? `–${req.creditsMax}` : ''}
        </Text>

        {/* If sub-requirements */}
        {req.options && (
          <Stack gap="sm" mt="xs">
            {req.options.map((opt, i) => (
              <RequirementBlock key={i} req={opt} depth={depth + 1} completedCourses={completedCourses} />
            ))}
          </Stack>
        )}

        {/* If direct course list */}
        {req.courses && (
          <List spacing="xs" size="sm">
            {req.courses.map((course) => (
              <List.Item 
                key={course.code} 
                icon={
                  <CircleIcon 
                    weight={completedCourses.find(c => c.code == course.code) ? "fill" : "bold"} 
                    size={8} 
                    color={completedCourses.find(c => c.code == course.code) ? theme.colors.royal[5] : theme.colors.navy[8]}
                  />
                }
              >
                <Text span fw={500}>
                  {course.code}
                </Text>{' '}
                — {course.title} ({course.credits} credits)
              </List.Item>
            ))}
          </List>
        )}
      </Stack>
    </Box>
  );
}

export default RequirementBlock;
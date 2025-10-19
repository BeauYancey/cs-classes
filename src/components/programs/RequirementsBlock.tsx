import { Box, Stack, Text, Title, List } from '@mantine/core';
import type { ProgramRequirement } from '../../types/ProgramRequirement';
import { CircleIcon } from '@phosphor-icons/react';

interface RequirementBlockProps {
  req: ProgramRequirement;
  depth?: number;
}

const RequirementBlock: React.FC<RequirementBlockProps> = ({ req, depth = 0 }) => {
  const indent = depth * 12;

  return (
    <Box pl={indent}>
      <Stack gap={4}>
        <Title order={depth < 2 ? 4 : 5}>{req.title}</Title>

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
              <RequirementBlock key={i} req={opt} depth={depth + 1} />
            ))}
          </Stack>
        )}

        {/* If direct course list */}
        {req.courses && (
          <List spacing="xs" size="sm" icon={<CircleIcon weight="fill" size={8} />}>
            {req.courses.map((course) => (
              <List.Item key={course.code}>
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
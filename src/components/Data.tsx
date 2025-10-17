import { Group, Text } from "@mantine/core";

interface DataProps {
  label: string;
  value: string;
  leftSection?: React.ReactNode;
}

export const Data: React.FC<DataProps> = ({label, value, leftSection}) => {
  return (
    <Group gap="xs">
      {leftSection}
      <Text>{label}: {value}</Text>
    </Group>
  );
}
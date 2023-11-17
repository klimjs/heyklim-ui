import { ActionIcon, Group, SegmentedControl, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export const Screens = () => {
  console.log('screens');

  return (
    <>
      <Group justify="space-between">
        <Text fw={500} size="sm" tt="uppercase">
          Screens
        </Text>

        <ActionIcon variant="outline" radius="xl" aria-label="Add screen" loading={false}>
          <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>

      <SegmentedControl
        orientation="vertical"
        mt="md"
        fullWidth
        size="lg"
        radius="md"
        data={['Page 23', 'Page 25', 'Page 26']}
      />
    </>
  );
};

import { ActionIcon, Group, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export const CurrentScreen = () => {
  console.log('current');

  return (
    <>
      <Group justify="space-between">
        <Text fw={700} size="sm" tt="uppercase">
          Page 26
        </Text>

        <ActionIcon
          color="red"
          variant="outline"
          radius="xl"
          aria-label="Remove screen"
          loading={false}
        >
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
};

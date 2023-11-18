import { RootState } from '@/redux/store';
import { ActionIcon, Group, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

export const CurrentScreen = () => {
  const { currentId } = useSelector((state: RootState) => state.screen);

  return (
    <>
      <Group justify="space-between">
        <Text fw={700} size="sm" tt="uppercase">
          Page {currentId}
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

import { setCurrentScreenId } from '@/redux/screen';
import { RootState } from '@/redux/store';
import { ActionIcon, Group, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const CurrentScreen = () => {
  const queryClient = useQueryClient();
  const { currentId } = useSelector((state: RootState) => state.screen);
  const dispatch = useDispatch();

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: () => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/screens/${currentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] });
      dispatch(setCurrentScreenId(null));
    },
  });

  return (
    <>
      <Group justify="space-between">
        <Text fw={700} size="sm" tt="uppercase">
          Page {currentId}
        </Text>

        <ActionIcon
          onClick={() => remove()}
          color="red"
          variant="outline"
          radius="xl"
          aria-label="Remove screen"
          loading={isRemoving}
        >
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
};

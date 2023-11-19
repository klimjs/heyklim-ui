import { setCurrentScreenId } from '@/redux/screen';
import { RootState } from '@/redux/store';
import { ScreenType } from '@/types';
import { ActionIcon, Group, Loader, ScrollArea, SegmentedControl, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Screens = () => {
  const queryClient = useQueryClient();
  const { currentId } = useSelector((state: RootState) => state.screen);
  const dispatch = useDispatch();

  const { isLoading: isScreensLoading, data: screens } = useQuery({
    queryKey: ['screens'],
    queryFn: () => axios(`${process.env.NEXT_PUBLIC_API_URL}/screens`).then((res) => res.data),
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: () => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/screens`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['screens'] }),
  });

  // set the first screen as current if currentId is null (first page load and screen delete)
  useEffect(() => {
    if (!isScreensLoading && screens.length && !currentId) {
      dispatch(setCurrentScreenId(screens[0].id));
    }
  }, [isScreensLoading, screens]);

  if (isScreensLoading) {
    return <Loader size="sm" type="bars" />;
  }

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text fw={500} size="sm" tt="uppercase">
          Screens
        </Text>

        <ActionIcon
          onClick={() => create()}
          variant="outline"
          radius="xl"
          aria-label="Add screen"
          loading={isCreating}
        >
          <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>

      <ScrollArea type="never">
        {screens && (
          <SegmentedControl
            orientation="vertical"
            fullWidth
            size="lg"
            radius="md"
            value={`${currentId}`}
            onChange={(v) => dispatch(setCurrentScreenId(v))}
            data={screens.map((screen: ScreenType) => ({
              value: screen.id,
              label: `Page ${screen.id}`,
            }))}
          />
        )}
      </ScrollArea>
    </>
  );
};

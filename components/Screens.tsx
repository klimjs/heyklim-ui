import { setCurrentScreenId } from '@/redux/screen';
import { RootState } from '@/redux/store';
import { ScreenType } from '@/types';
import { ActionIcon, Group, Loader, SegmentedControl, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const Screens = () => {
  const { currentId } = useSelector((state: RootState) => state.screen);
  const dispatch = useDispatch();

  const { isLoading: isScreensLoading, data: screens } = useQuery({
    queryKey: ['screens'],
    queryFn: async () => {
      const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/screens`);

      dispatch(setCurrentScreenId(data[0].id));

      return data;
    },
  });

  if (isScreensLoading) {
    return <Loader size="sm" type="bars" />;
  }

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
        value={`${currentId}`}
        onChange={(v) => dispatch(setCurrentScreenId(v))}
        data={screens.map((screen: ScreenType) => ({
          value: screen.id,
          label: `Page ${screen.id}`,
        }))}
      />
    </>
  );
};

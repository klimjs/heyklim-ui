import { setCurrentScreenId } from '@/redux/screen';
import { RootState } from '@/redux/store';
import { ScreenType } from '@/types';
import {
  ActionIcon,
  Card,
  Center,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconBone, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const CurrentScreen = () => {
  const queryClient = useQueryClient();
  const { currentId } = useSelector((state: RootState) => state.screen);
  const dispatch = useDispatch();

  const { isLoading: isScreensLoading, data: screens } = useQuery({
    queryKey: ['screens-select'],
    queryFn: async () => {
      const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/screens`);

      return data.map((screen: ScreenType) => ({
        value: `${screen.id}`,
        label: `Page ${screen.id}`,
      }));
    },
  });

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: () => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/screens/${currentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] });
      queryClient.invalidateQueries({ queryKey: ['screens-select'] });
      dispatch(setCurrentScreenId(null));
    },
  });

  if (!currentId) return;

  return (
    <>
      <Group justify="space-between" mb="md">
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

      <Stack maw={400} mx="auto">
        <Card padding="lg" radius="md" withBorder p="xl">
          <Card.Section>
            <Flex justify="flex-end">
              <ActionIcon variant="subtle" aria-label="Remove block" color="red">
                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Flex>
          </Card.Section>

          <Card.Section>
            <Center>
              <ThemeIcon variant="white" size="xl" color="violet" m="md">
                <IconBone style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
            </Center>
          </Card.Section>

          <Card.Section>
            <Select
              label="Link to"
              placeholder="Pick screen"
              data={isScreensLoading ? [] : screens}
            />
          </Card.Section>
        </Card>
      </Stack>
    </>
  );
};

import { setCurrentScreenId } from '@/redux/screen';
import { RootState } from '@/redux/store';
import { ActionType, ScreenType } from '@/types';
import {
  ActionIcon,
  Card,
  Center,
  Flex,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconBeach, IconBike, IconBone, IconTrash } from '@tabler/icons-react';
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

  const { isLoading: isActionsLoading, data: actions } = useQuery({
    enabled: !!currentId,
    queryKey: ['actions', currentId],
    queryFn: () =>
      axios(`${process.env.NEXT_PUBLIC_API_URL}/actions/screen/${currentId}`).then(
        (res) => res.data
      ),
  });

  const { mutate: removeAction, isPending: isActionRemoving } = useMutation({
    mutationFn: ({ id }: ActionType) =>
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/actions/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
  });

  const { mutate: setTarget } = useMutation({
    mutationFn: ({ id, targetId }: ActionType) =>
      axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/actions/${id}`, { targetId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
  });

  if (!currentId) return;

  if (isActionsLoading) {
    return <Loader size="sm" type="bars" />;
  }

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
        {actions.map((action: ActionType) => (
          <Card key={action.id} padding="lg" radius="md" withBorder p="xl">
            <Card.Section>
              <Flex justify="flex-end">
                <ActionIcon
                  onClick={() => removeAction({ id: action.id })}
                  loading={isActionRemoving}
                  variant="subtle"
                  aria-label="Remove block"
                  color="red"
                >
                  <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Flex>
            </Card.Section>

            <Card.Section>
              <Center>
                <ThemeIcon variant="white" size="xl" color={action.block?.color} m="md">
                  {action.block?.type === 'beach' && (
                    <IconBeach style={{ width: '70%', height: '70%' }} />
                  )}
                  {action.block?.type === 'bike' && (
                    <IconBike style={{ width: '70%', height: '70%' }} />
                  )}
                  {action.block?.type === 'bone' && (
                    <IconBone style={{ width: '70%', height: '70%' }} />
                  )}
                </ThemeIcon>
              </Center>
            </Card.Section>

            <Card.Section>
              <Select
                value={`${action.targetId}`}
                onChange={(v) => setTarget({ id: action.id, targetId: Number(v) })}
                label="Link to"
                placeholder="Pick screen"
                data={isScreensLoading ? [] : screens}
              />
            </Card.Section>
          </Card>
        ))}
      </Stack>
    </>
  );
};

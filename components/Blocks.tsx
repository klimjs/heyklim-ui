import { RootState } from '@/redux/store';
import { BlockType } from '@/types';
import { Button, Center, Group, Loader, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconBeach, IconBike, IconBone } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const Blocks = () => {
  const queryClient = useQueryClient();
  const { currentId } = useSelector((state: RootState) => state.screen);
  const [active, setActive] = useState<number | null>(null);

  const { isLoading: isBlocksLoading, data: blocks } = useQuery({
    queryKey: ['blocks'],
    queryFn: () => axios(`${process.env.NEXT_PUBLIC_API_URL}/blocks`).then((res) => res.data),
  });

  const { mutate: add, isPending: isAdding } = useMutation({
    mutationFn: () =>
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/actions`, {
        screenId: currentId,
        blockId: active,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['actions'] }),
  });

  if (isBlocksLoading) {
    return <Loader size="sm" type="bars" />;
  }

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text fw={500} size="sm" tt="uppercase">
          Blocks
        </Text>

        <Button
          onClick={() => add()}
          disabled={!active}
          loading={isAdding}
          variant="subtle"
          rightSection={<IconArrowRight size={14} />}
        >
          Add block to screen
        </Button>
      </Group>

      <Stack>
        {blocks.map((block: BlockType) => (
          <Paper
            key={block.id}
            onClick={() => setActive(block.id)}
            shadow="xs"
            radius="md"
            p="xl"
            withBorder={active === block.id}
            style={(theme) => ({ cursor: 'pointer', borderColor: theme.colors.blue[6] })}
          >
            <Center>
              <ThemeIcon variant="white" size="xl" color={block.color}>
                {block.type === 'beach' && <IconBeach style={{ width: '70%', height: '70%' }} />}
                {block.type === 'bike' && <IconBike style={{ width: '70%', height: '70%' }} />}
                {block.type === 'bone' && <IconBone style={{ width: '70%', height: '70%' }} />}
              </ThemeIcon>
            </Center>
          </Paper>
        ))}
      </Stack>
    </>
  );
};

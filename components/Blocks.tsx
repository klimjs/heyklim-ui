import { Button, Center, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconArrowRight, IconBeach, IconBike, IconBone } from '@tabler/icons-react';

export const Blocks = () => {
  console.log('blocks');

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text fw={500} size="sm" tt="uppercase">
          Blocks
        </Text>

        <Button variant="subtle" rightSection={<IconArrowRight size={14} />}>
          Add block to screen
        </Button>
      </Group>

      <Stack>
        <Paper
          shadow="xs"
          radius="md"
          p="xl"
          withBorder={true}
          style={(theme) => ({ cursor: 'pointer', borderColor: theme.colors.blue[6] })}
        >
          <Center>
            <ThemeIcon variant="white" size="xl" color="green">
              <IconBeach style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
          </Center>
        </Paper>

        <Paper
          shadow="xs"
          radius="md"
          p="xl"
          withBorder={false}
          style={(theme) => ({ cursor: 'pointer', borderColor: theme.colors.blue[6] })}
        >
          <Center>
            <ThemeIcon variant="white" size="xl" color="orange">
              <IconBike style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
          </Center>
        </Paper>

        <Paper
          shadow="xs"
          radius="md"
          p="xl"
          withBorder={false}
          style={(theme) => ({ cursor: 'pointer', borderColor: theme.colors.blue[6] })}
        >
          <Center>
            <ThemeIcon variant="white" size="xl" color="violet">
              <IconBone style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
          </Center>
        </Paper>
      </Stack>
    </>
  );
};

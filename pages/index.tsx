import { Blocks } from '@/components/Blocks';
import { CurrentScreen } from '@/components/CurrentScreen';
import { Screens } from '@/components/Screens';
import { Button, AppShell, Group, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

const HomePage = () => {
  console.log('home');

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: true } }}
      aside={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text size="xl">Heyklim</Text>

          <Button
            component="a"
            href="/preview"
            target="_blank"
            rightSection={<IconExternalLink size={14} />}
          >
            Preview
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Blocks />
      </AppShell.Navbar>
      <AppShell.Main>
        <CurrentScreen />
      </AppShell.Main>
      <AppShell.Aside p="md">
        <Screens />
      </AppShell.Aside>
    </AppShell>
  );
};

export default HomePage;

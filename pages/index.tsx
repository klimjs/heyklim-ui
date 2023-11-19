import { Blocks } from '@/components/Blocks';
import { CurrentScreen } from '@/components/CurrentScreen';
import { Screens } from '@/components/Screens';
import { Button, AppShell, Group, Text, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons-react';

const HomePage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Sorry. My weekend is over :)">
        <Text>My plan was also to develop the flow preview functionality.</Text>
        <Text>But this is out of scope for now.</Text>
      </Modal>

      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 320, breakpoint: 'sm', collapsed: { desktop: false, mobile: true } }}
        aside={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: true } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Text size="xl">Heyklim</Text>

            <Button
              // component="a"
              // href="/preview"
              // target="_blank"
              onClick={open}
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
    </>
  );
};

export default HomePage;

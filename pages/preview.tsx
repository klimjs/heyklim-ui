import { useHeadroom } from '@mantine/hooks';
import { AppShell, Box, Group, Text, rem } from '@mantine/core';
import { Preview } from '@/components/Preview';

const PreviewPage = () => {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell header={{ height: 60, collapsed: !pinned, offset: false }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text size="xl">Heyklim — preview mode</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <Preview />
      </AppShell.Main>
    </AppShell>
  );
};

export default PreviewPage;

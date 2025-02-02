import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { ProjectWithRoundDetailsWithOwnerWithTeamType } from '~/types/project';
import { formatDate } from '~/utils/formatDates';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';
import Discussions from './ProjectDiscussion';
import ProjectContributors from './project-interactions/project-tabs/ProjectContributors';

export const ProjectsTabs = ({
  projectDetails,
  isLoading,
}: {
  projectDetails:
    | ProjectWithRoundDetailsWithOwnerWithTeamType
    | null
    | undefined;
  isLoading: boolean;
}) => {
  console.log('project details - ', projectDetails);
  return (
    <Tabs variant={'cubik'} alignSelf={'start'} w="full">
      <TabList
        overflowY={{ base: 'hidden', md: 'inherit' }}
        overflowX={{ base: 'scroll', md: 'inherit' }}
        gap={{ base: '24px', md: '32px' }}
      >
        <Tab>Details</Tab>
        <Tab>Contributors</Tab>
        <Tab isDisabled>Discussion</Tab>
        <Tab isDisabled>Updates</Tab>
      </TabList>
      <TabPanels p="0">
        <TabPanel>
          <ProjectsDetailedDescription
            isLoading={isLoading}
            description={projectDetails?.long_description}
          />
          {projectDetails && (
            <Stack direction={{ base: 'row', md: 'row' }}>
              <Box as="p" textStyle="body4" color="neutral.7">
                Created: {formatDate(projectDetails?.createdAt)}
                {''} by @{projectDetails?.owner?.username}
              </Box>
            </Stack>
          )}
        </TabPanel>
        <TabPanel overflowX="scroll">
          {projectDetails?.id && (
            <ProjectContributors
              projectId={projectDetails?.id}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
        <TabPanel>{isLoading ? <></> : <Discussions />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

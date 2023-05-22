import { ProjectJoinRoundStatus, ProjectVerifyStatus } from '@prisma/client';
import { isFuture, isPast } from 'date-fns';
import {
  ProjectJoinRoundWithFundingType,
  projectWithFundingRoundType,
} from '~/types/project';

type projectRoundAndVerifyType = {
  round?: ProjectJoinRoundWithFundingType;
  status: ProjectJoinRoundStatus | ProjectVerifyStatus | 'LIVE' | 'ENDED';
};

export const ProjectStatus = ({
  projectData,
}: {
  projectData: projectWithFundingRoundType;
}): projectRoundAndVerifyType | null => {
  let projectRoundData: projectRoundAndVerifyType | null = null;
  if (projectData.status === ProjectVerifyStatus.VERIFIED) {
    // verified project now only check round status
    if (projectData.ProjectJoinRound.length > 0) {
      projectData.ProjectJoinRound.map(
        (projectJoinRound: ProjectJoinRoundWithFundingType) => {
          if (projectJoinRound.fundingRound.active) {
            // now check the project round status
            if (projectJoinRound.status === ProjectJoinRoundStatus.APPROVED) {
              // check dates for live status
              if (isFuture(projectJoinRound.fundingRound.startTime)) {
                projectRoundData = {
                  round: projectJoinRound,
                  status: ProjectJoinRoundStatus.APPROVED,
                };
              } else if (isFuture(projectJoinRound.fundingRound.endtime)) {
                projectRoundData = {
                  round: projectJoinRound,
                  status: 'LIVE',
                };
              } else if (isPast(projectJoinRound.fundingRound.endtime)) {
                projectRoundData = {
                  round: projectJoinRound,
                  status: 'ENDED',
                };
              }
            } else {
              projectRoundData = {
                round: projectJoinRound,
                status: projectJoinRound.status,
              };
            }
          } else {
            projectRoundData = {
              round: projectJoinRound,
              status: 'ENDED',
            };
          }
        }
      );
    } else {
      // project is approved but not participating in any round
      projectRoundData = { status: projectData.status };
    }
  } else {
    projectRoundData = { status: projectData.status };
  }
  return projectRoundData;
};

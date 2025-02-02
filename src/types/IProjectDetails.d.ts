import { Prisma } from '@prisma/client';

export type ProjectWithCommentsAndRoundsType = Prisma.ProjectsModelGetPayload<{
  include: {
    ProjectJoinRound: {
      include: {
        fundingRound: true;
      };
    };
    owner: true;
    Team: {
      include: {
        user: true;
      };
    };
  };
}>;

export type ProjectCreatorTeamType = Prisma.TeamGetPayload<{
  include: {
    user: true;
  };
}>;

import { Box, Center, Flex, HStack } from '@chakra-ui/react';
import { ProjectJoinRoundStatus, ProjectVerifyStatus } from '@prisma/client';
import { AiOutlineWarning } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { HiBan } from 'react-icons/hi';
import { ImCheckboxChecked } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';
import { TbListSearch } from 'react-icons/tb';
import RoundStatus from '~/components/common/dates/Status';

const ProjectStatusBanner = ({
  status,
  roundName,
  startTime,
  endtime,
}: {
  status: string;
  roundName?: string;
  startTime?: Date;
  endtime?: Date;
}) => {
  // check if projects is live and receiving donation in a live round
  console.log('status and round name', status, roundName, startTime, endtime);
  switch (status) {
    case ProjectVerifyStatus.REVIEW:
      return (
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          backgroundColor={'#FFD83D08'}
          borderColor="#FFD83D40"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.4)"
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#110F0A">
            <TbListSearch size={14} color="#FFE747" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="surface.yellow.2"
            >
              Under Review
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="surface.yellow.1"
          >
            Thank you for submitting. Your project is under review.
          </Box>
        </Flex>
      );
    case ProjectVerifyStatus.VERIFIED:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          borderColor="#1C7CEB22"
          backgroundColor={'#1C7CEB08'}
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#1C7CEB">
            <MdVerified size={14} color="#fff" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="white"
            >
              Verified
            </Box>{' '}
          </HStack>{' '}
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="surface.blue.1"
          >
            Congratulations! Your project has been verified. You can now apply
            for grants.
          </Box>
        </Flex>
      );
    case ProjectVerifyStatus.FAILED:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          borderColor="surface.red.1"
          backgroundColor={'#140001'}
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#660005">
            <AiOutlineWarning size={14} color="#FFCAC2" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="#FFCAC2"
            >
              Approval Failed
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="#FFCAC2"
          >
            Unfortunately your project did not meet the review criteria.
          </Box>
        </Flex>
      );
    case 'LIVE':
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          borderColor="#31F57940"
          backgroundColor={'#31F57908'}
        >
          {startTime && endtime && (
            <Center w="fit-content">
              <RoundStatus startDate={startTime} endDate={endtime} />
            </Center>
          )}
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="neutral.11"
            w="full"
          >
            Participating in <b>{roundName}</b> Round
          </Box>
        </Flex>
      );
    case ProjectJoinRoundStatus.APPROVED:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          borderColor="#8F47FF16"
          backgroundColor={'#0A001A'}
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#6D28D9">
            <ImCheckboxChecked size={14} color="#E6D6FF" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="#E6D6FF"
            >
              Selected
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="#E6D6FF"
          >
            Congratulations your project has been selected to participate in{' '}
            <b>{roundName} Round.</b>
          </Box>
        </Flex>
      );
    case ProjectJoinRoundStatus.REJECTED:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          backgroundColor={'#0F0A00'}
          borderColor="#FFA50010"
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#EB7626">
            <HiBan size={14} color="#FFE3CC" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="#FFE3CC"
            >
              Not Selected
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="surface.red.3"
          >
            Thank you for your submission, but unfortunately it did not meet our
            review criteria.
          </Box>
        </Flex>
      );
    case ProjectJoinRoundStatus.PENDING:
      return (
        <Flex
          zIndex="9"
          flexDirection={{ base: 'column', sm: 'row' }}
          padding={{ base: '10px 16px', md: '12px 24px' }}
          w="full"
          align={{ base: 'start', sm: 'center' }}
          gap="8px"
          borderBottom="1px solid"
          borderTopRadius={'16px'}
          backgroundColor={'#0F030F'}
          borderColor="#330A33"
        >
          <HStack w="fit-content" rounded="full" p="6px 10px" bg="#470E47">
            <FiClock size={14} color="#FFCCFF" />
            <Box
              as="p"
              noOfLines={1}
              whiteSpace={'nowrap'}
              textStyle={{ base: 'body6', md: 'body5' }}
              color="#FFCCFF"
            >
              Approval Pending
            </Box>
          </HStack>
          <Box
            as="p"
            noOfLines={{ base: 2, md: 1 }}
            display={{ base: 'none', md: 'block' }}
            whiteSpace={{ base: 'normal', md: 'nowrap' }}
            textStyle={{ base: 'body6', md: 'body5' }}
            color="#FFCCFF"
          >
            Your project is currently under review for {roundName} Round. Check
            your mail for more information.
          </Box>
        </Flex>
      );
    default:
      return null;
  }
};

export default ProjectStatusBanner;

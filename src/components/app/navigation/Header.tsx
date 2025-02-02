import {
  Box,
  Button,
  Center,
  Collapse,
  Container,
  Flex,
  HStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import React, { memo } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import Logo from '~/components/common/logo/Logo';
import { SearchBar } from '~/components/common/searchbar';

const MobileNavCollapsible = memo(function MobileNavCollapsible({
  isOpen,
  onToggle,
  onClose,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  const landingPage =
    typeof window !== 'undefined' && window.location.pathname === '/';

  return (
    <Collapse in={isOpen} animateOpacity>
      <Center
        display={landingPage ? 'none' : 'flex'}
        w="full"
        px="24px"
        pt={{ base: '16px', sm: '24px' }}
      >
        <SearchBar width={{ base: '100%', sm: '', md: '2rem', lg: '8rem' }} />
      </Center>
      <Flex
        display={{ base: 'flex', lg: 'none' }}
        flexDirection="column"
        alignItems="start"
        fontSize="18px"
        fontWeight={'700'}
        p="24px"
        pt="0px"
        gap={{ base: '16px', sm: '24px' }}
      >
        <Center w="full">{children}</Center>
        <Link href="/projects" style={{ width: '100%' }} passHref>
          <Flex
            direction={'row'}
            alignItems="center"
            justify={'space-between'}
            w="100%"
          >
            <Box
              display="flex"
              alignItems={'start'}
              w="100%"
              onClick={() => onToggle()}
              as="button"
              transition={'all 0.3s ease'}
              fontSize="15px"
              fontWeight="400"
            >
              Projects
            </Box>
          </Flex>
        </Link>
        <Link href="/rounds" style={{ width: '100%' }} passHref>
          <Flex
            direction={'row'}
            alignItems="center"
            justify={'space-between'}
            w="100%"
          >
            <Link href="/grants">
              <Box
                display="flex"
                alignItems={'start'}
                w="100%"
                onClick={() => {
                  onClose();
                }}
                as="button"
                transition={'all 0.3s ease'}
                fontSize="15px"
                fontWeight="400"
              >
                Grants
              </Box>
            </Link>
          </Flex>
        </Link>
      </Flex>
    </Collapse>
  );
});

export const Header = memo(function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { connected } = useWallet();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const isCreateProfilePage =
    typeof window !== 'undefined' &&
    window.location.pathname !== '/create-profile';

  const isActiveRoute = (route: string): boolean => {
    return typeof window !== 'undefined' && window.location.pathname === route;
  };

  const landingPage =
    typeof window !== 'undefined' && window.location.pathname === '/';

  const NavbarCTA: React.FC<any> = ({ children }) => {
    return (
      <Center
        h={{ base: '2rem', md: '2.6rem' }}
        justifyContent="end"
        zIndex="99"
      >
        <Center display={{ base: connected ? 'none' : 'flex', md: 'none' }}>
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </Center>
        {isDesktop ? (
          <Center w="fit-content">{children}</Center>
        ) : (
          <HStack gap="0">
            {connected ? (
              <Center w={'100%'} display={{ base: 'flex', md: 'none' }} gap="0">
                {children}
              </Center>
            ) : (
              ''
            )}
            <RxDotsVertical size={24} color="white" onClick={onToggle} />
          </HStack>
        )}
      </Center>
    );
  };
  const DeskNavbarItems = () => {
    return isDesktop && isCreateProfilePage ? (
      <>
        <SearchBar
          display={landingPage ? 'none' : 'flex'}
          width={{ base: 'full', sm: 'full', md: '8rem', lg: '14rem' }}
        />
        <HStack
          gap={{ base: '28px', lg: '32px' }}
          alignItems={'center'}
          justifyContent={landingPage ? 'center' : 'flex-start'}
          mx="auto"
        >
          <Button h="full" variant={'unstyled'} as={Link} href="/projects">
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/projects') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Projects
            </Box>
          </Button>
          <Button as={Link} href="/grants" h="full" variant={'unstyled'}>
            <Box
              as="p"
              textStyle={'title4'}
              color={isActiveRoute('/grants') ? 'brand.teal5' : 'neutral.8'}
              cursor={'pointer'}
            >
              Grants
            </Box>
          </Button>
        </HStack>
      </>
    ) : (
      <></>
    );
  };
  return (
    <Container
      w="full"
      zIndex="10"
      maxW={'full'}
      position="fixed"
      top="0px"
      minH="4rem"
      p="0"
      bg="transparent"
      sx={{
        backdropFilter: 'blur(20px)',
        margin: '0px !important',
        marginTop: '0px !important',
      }}
    >
      <Flex
        mx="auto"
        p={{ base: '14px 16px', md: '20px 20px' }}
        maxW="7xl"
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'24px'}
      >
        <HStack w="full" gap={{ base: '28px', lg: '32px' }}>
          <Logo />
          <DeskNavbarItems />
        </HStack>
        <NavbarCTA>{children}</NavbarCTA>
      </Flex>
      <MobileNavCollapsible
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
      />
    </Container>
  );
});

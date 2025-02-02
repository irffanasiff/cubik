import { Center, HStack, Skeleton, Spinner } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MemoizedIconButtonBadge from './list/ListButton';
import UserNavMenu from './navbar-menu/UserNavMenu';

export interface UserContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: string;
}

const NavbarCTA = () => {
  const [currentPath, setCurrentPath] = useState('');
  const { publicKey, disconnect } = useWallet();
  const { status } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  console.log('session status in cta - ', status);
  // If on create-profile page, don't show anything
  if (currentPath === '/create-profile') {
    return null;
  }

  // Based on status, render appropriate component
  if (status === 'loading') {
    return (
      <Skeleton
        isLoaded
        fadeDuration={1}
        startColor="#121219"
        endColor="#37383E"
      />
    );
  }

  if (status === 'authenticated' && publicKey) {
    return (
      <HStack gap={{ base: '2px', md: '16px' }}>
        <MemoizedIconButtonBadge />
        <UserNavMenu />
      </HStack>
    );
  }

  // Default case
  return publicKey ? (
    <Center as="button" onClick={disconnect}>
      <Spinner size="sm" color="teal" />
    </Center>
  ) : (
    <Center>
      <WalletMultiButton>Connect Wallet</WalletMultiButton>
    </Center>
  );
};

export default NavbarCTA;

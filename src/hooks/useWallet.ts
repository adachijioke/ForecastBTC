import { useState, useEffect } from 'react';
import { AppConfig, showConnect, UserSession, UserData } from '@stacks/connect';

interface WalletState {
  isConnected: boolean;
  userSession: UserSession | null;
  userData: UserData | null;
  address: string | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    userSession: null,
    userData: null,
    address: null,
  });

  const appConfig = new AppConfig(['store_write', 'publish_data']);
  const userSession = new UserSession({ appConfig });

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setWallet({
          isConnected: true,
          userSession,
          userData,
          address: userData.profile.stxAddress.mainnet,
        });
      });
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setWallet({
        isConnected: true,
        userSession,
        userData,
        address: userData.profile.stxAddress.mainnet,
      });
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'ForecastBTC',
        icon: '/logo.svg',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut('/');
    setWallet({
      isConnected: false,
      userSession: null,
      userData: null,
      address: null,
    });
  };

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
  };
};
import { Button } from '@chakra-ui/react';
import React from 'react';
import {
  AccountModal,
  AccountProvider,
} from '../../components/account/AccountModal';
import Page from '../../components/Page';
import RetroHeading from '../../components/RetroHeading';
import { useAccount } from '../../state/account';

const StartPage = () => {
  const { viewAccount } = useAccount();
  return (
    <Page.Container>
      <RetroHeading as="h1">The Verse</RetroHeading>
      <Button mt={5} onClick={viewAccount}>
        Start
      </Button>

      <AccountModal />
    </Page.Container>
  );
};

export default function TheVerse() {
  return (
    <AccountProvider>
      <Page>
        <StartPage />
      </Page>
    </AccountProvider>
  );
}

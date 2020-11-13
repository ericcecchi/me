import {
  Button,
  Collapse,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/core';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useReducer,
} from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';

import {
  copySecret,
  createAccount,
  getAccount,
  deleteAccount,
} from '../../services/account';
import { handleError } from '../../services/error';
import { makePayment } from '../../services/makePayment';
import {
  AccountContext,
  initialState,
  reducer,
  setModalContent,
  useAccount,
} from '../../state/account';
import CodeBlock from '../Codeblock';
import Form from '../Form';
import { FormField, useInput } from '../FormField';

const ViewAccountContent: FunctionComponent = () => {
  const { account, onClose, dispatch } = useAccount();
  const [show, setShow] = React.useState(false);
  const handleToggle = useCallback(() => setShow(!show), [show, setShow]);
  const handleSignout = useCallback(
    () => dispatch(setModalContent(DeleteAccountContent)),
    [dispatch]
  );
  const accountInfo = account?.state ? (
    <>
      {account.balances?.map((balance) => {
        return (
          <Stat>
            <StatLabel>Balance</StatLabel>
            <StatNumber>
              {balance.balance}{' '}
              {balance.asset_type === 'native' ? 'XLM' : balance.asset_type}
            </StatNumber>
            <StatHelpText>
              Last updated:{' '}
              {new Date(account.state?.last_modified_time).toLocaleString()}
            </StatHelpText>
          </Stat>
        );
      })}

      <Button
        display="block"
        variantColor="purple"
        mb={3}
        onClick={() => dispatch(setModalContent(MakePaymentContent))}
      >
        Make a Payment
      </Button>
    </>
  ) : null;

  return (
    <ModalContent>
      <ModalHeader>Your Account</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {accountInfo}

        <Button size="sm" variant="link" onClick={handleToggle}>
          {show ? 'Hide advanced options' : 'Show advanced options'}
        </Button>
        <Collapse mt={4} isOpen={show}>
          <Text fontSize="sm" fontWeight="bold">
            Public key
          </Text>
          {account?.publicKey && (
            <CodeBlock mt={2} p={2}>
              {account.publicKey}
            </CodeBlock>
          )}
          <Button
            mr={3}
            onClick={() => dispatch(setModalContent(CopySecretContent))}
          >
            Copy Secret Key
          </Button>
          <Button variantColor="red" onClick={handleSignout}>
            Delete Account
          </Button>
        </Collapse>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const CreateAccountContent: FunctionComponent = () => {
  const { onClose, dispatch } = useAccount();
  const [onSubmit, { error, isLoading }] = useMutation(createAccount, {
    onSuccess: () => {
      queryCache.invalidateQueries('account');
      dispatch(setModalContent(ViewAccountContent));
      toast({
        title: 'Account created.',
        status: 'success',
        duration: 4000,
      });
    },
  });
  const [passcode1, onChangePasscode1] = useInput();
  const [passcode2, onChangePasscode2] = useInput();
  const [isValid, setIsValid] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setIsValid(!!passcode1 && !!passcode2 && passcode1 === passcode2);
  }, [passcode2, passcode1, setIsValid]);

  return (
    <ModalContent>
      <ModalHeader>Create Account</ModalHeader>
      <ModalCloseButton />

      <Form
        onSubmit={async () => {
          await onSubmit({ passcode1, passcode2 });
        }}
      >
        <ModalBody>
          <Text mb={3}>To enter The Verse, you must create an account.</Text>
          <FormField
            value={passcode1}
            onChange={onChangePasscode1}
            label={'Passcode'}
            isRequired
          />
          <FormField
            mt={3}
            value={passcode2}
            onChange={onChangePasscode2}
            label={'Confirm passcode'}
            isRequired
            errors={error ? [handleError(error)] : undefined}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variantColor="purple"
            type="submit"
            isLoading={isLoading}
            isDisabled={!isValid || isLoading}
          >
            Create Account
          </Button>
        </ModalFooter>
      </Form>
    </ModalContent>
  );
};

const DeleteAccountContent: FunctionComponent = () => {
  const { onClose, dispatch } = useAccount();
  const toast = useToast();
  const [onSubmit, { isLoading, error }] = useMutation(deleteAccount, {
    onSuccess: () => {
      queryCache.setQueryData('account', null);
      toast({
        title: 'Account deleted',
      });
      onClose();
    },
  });
  const [input, onChange] = useInput();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(input === 'NUKE');
  }, [input, setIsValid]);

  return (
    <ModalContent>
      <ModalHeader>Delete Account</ModalHeader>
      <ModalCloseButton />
      <Form
        onSubmit={async () => {
          await onSubmit(input);
        }}
      >
        <ModalBody>
          <Text mb={3}>Are you sure? This will destroy your account.</Text>

          <FormField
            value={input}
            onChange={onChange}
            label={'Enter NUKE to confirm'}
            errors={error ? [handleError(error)] : undefined}
            isRequired
          />
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => dispatch(setModalContent(ViewAccountContent))}
          >
            Cancel
          </Button>
          <Button
            variantColor="red"
            type="submit"
            isLoading={isLoading}
            isDisabled={!isValid || isLoading}
          >
            Destroy Account
          </Button>
        </ModalFooter>
      </Form>
    </ModalContent>
  );
};

const MakePaymentContent: FunctionComponent = () => {
  const { account, dispatch } = useAccount();
  const toast = useToast();
  const [onSubmit, { isLoading, error }] = useMutation(makePayment, {
    onSuccess: () => {
      queryCache.invalidateQueries('account');
      toast({
        title: 'Payment sent',
        description: 'Your payment will be delivered shortly.',
        status: 'success',
      });
      dispatch(setModalContent(ViewAccountContent));
    },
  });
  const [amount, setAmount] = useInput();
  const [destination, setDestination] = useInput();
  const [passcode, setPasscode] = useInput();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(Boolean(amount) && Boolean(destination) && Boolean(passcode));
  }, [amount, destination, passcode, setIsValid]);

  return (
    <ModalContent>
      <ModalHeader>Make a Payment</ModalHeader>
      <ModalCloseButton />
      <Form
        onSubmit={async () => {
          if (account) {
            await onSubmit({ amount, destination, passcode, account });
          }
        }}
      >
        <ModalBody>
          <Text mb={3}>
            Fill out the fields below to send a payment to another account.
          </Text>

          <FormField
            value={amount}
            onChange={setAmount}
            label="Amount"
            placeholder="100"
            isRequired
          />
          <FormField
            mt={2}
            value={destination}
            onChange={setDestination}
            label="Destination address"
            placeholder="GDJELRCHB6ZBIE7WZIKDCDN2MKMMWQQK2Z34YRT37J3PPXJ7INTZSTYJ"
            isRequired
          />
          <FormField
            mt={2}
            value={passcode}
            onChange={setPasscode}
            label={'Passcode'}
            isRequired
            errors={error ? [handleError(error)] : undefined}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => dispatch(setModalContent(ViewAccountContent))}
          >
            Cancel
          </Button>
          <Button
            variantColor="red"
            type="submit"
            isLoading={isLoading}
            isDisabled={!isValid || isLoading}
          >
            Send Payment
          </Button>
        </ModalFooter>
      </Form>
    </ModalContent>
  );
};

const CopySecretContent: FunctionComponent = () => {
  const { account, dispatch } = useAccount();
  const toast = useToast();
  const onSubmit = (passcode: string) => {
    if (account) {
      copySecret(passcode, account);
      dispatch(setModalContent(ViewAccountContent));
      toast({
        title: 'Secret key copied to clipboard.',
        status: 'success',
        duration: 4000,
      });
    }
  };

  return (
    <EnterPasscodeContent
      onSubmit={onSubmit}
      onCancel={() => dispatch(setModalContent(ViewAccountContent))}
    />
  );
};

const EnterPasscodeContent: FunctionComponent<EnterPasscodeContentProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [error, setError] = useState('');
  const [passcode, onChange] = useInput();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!passcode);
  }, [passcode, setIsValid]);

  return (
    <ModalContent>
      <ModalHeader>Enter Passcode</ModalHeader>
      <ModalCloseButton />
      <Form
        onSubmit={() => {
          try {
            onSubmit(passcode);
          } catch (e) {
            setError(handleError(e));
          }
        }}
      >
        <ModalBody>
          <Text mb={3}>To continue, you must enter your passcode.</Text>
          <FormField
            value={passcode}
            onChange={onChange}
            label={'Passcode'}
            isRequired
            errors={error ? [error] : undefined}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button variantColor="purple" type="submit" isDisabled={!isValid}>
            Continue
          </Button>
        </ModalFooter>
      </Form>
    </ModalContent>
  );
};

interface EnterPasscodeContentProps {
  onCancel: (e: React.SyntheticEvent) => void;
  onSubmit: (input: string) => void;
}

export function AccountModal() {
  const { onClose, isOpen, content: ModalContent } = useAccount();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      {ModalContent && <ModalContent />}
    </Modal>
  );
}

export function AccountProvider(props: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: account, error } = useQuery('account', getAccount);
  const [state, dispatch] = useReducer(reducer, initialState);
  const viewAccount = useCallback(() => {
    onOpen();
    if (account?.publicKey) {
      dispatch(setModalContent(ViewAccountContent));
    } else {
      dispatch(setModalContent(CreateAccountContent));
    }
  }, [account, onOpen, dispatch]);

  return (
    <AccountContext.Provider
      value={{
        account,
        viewAccount,
        onOpen,
        isOpen,
        onClose,
        ...state,
        dispatch,
        error,
      }}
      {...props}
    />
  );
}

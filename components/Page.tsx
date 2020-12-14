import React from 'react';
import {
  Container as BaseContainer,
  Box,
  HStack,
  BoxProps,
  useColorMode,
  IconButton,
  Text,
  Link as ChakraLink,
  useStyleConfig,
  useColorModeValue,
  Stack,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { FaLinkedinIn } from 'react-icons/fa';

const Container = (props: BoxProps) => {
  return <BaseContainer maxW="70ch" py={8} px={3} {...props} />;
};

function MainNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'brand.800');
  const styles = useStyleConfig('NavLink', {});

  return (
    <Box
      position="sticky"
      top={0}
      bg={bg}
      zIndex={1}
      opacity={0.95}
      transition="background-color 0.2s"
    >
      <Container as="header" px={0} py={3} display="flex">
        <HStack as="nav">
          <Link href="/" passHref>
            <ChakraLink sx={styles}>
              <Text fontWeight="bold">./eric_cecchi</Text>
            </ChakraLink>
          </Link>

          <Link href="/work" passHref>
            <ChakraLink sx={styles}>/work</ChakraLink>
          </Link>

          <a
            href="https://managerreadme.com/readme/ericcecchi"
            rel="noopener"
            target="_blank"
          >
            <ChakraLink sx={styles}>
              /mgmt <ExternalLinkIcon ml={1} />
            </ChakraLink>
          </a>

          <Link href="/blog" passHref>
            <ChakraLink sx={styles}>/blog</ChakraLink>
          </Link>
        </HStack>

        <Box ml="auto">
          <a
            href="https://www.linkedin.com/in/ericcecchi/"
            rel="noopener"
            target="blank"
          >
            <Tooltip label="View my LinkedIn profile">
              <IconButton
                isRound
                variant="ghost"
                aria-label="View my LinkedIn profile"
                sx={styles}
                icon={<Icon as={FaLinkedinIn} />}
              />
            </Tooltip>
          </a>

          <Tooltip label="Toggle color mode">
            <IconButton
              isRound
              variant="ghost"
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              sx={styles}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            />
          </Tooltip>
        </Box>
      </Container>
    </Box>
  );
}

function Page(props: BoxProps) {
  return (
    <Stack minH="100vh">
      <MainNav />
      <Box minH={'100%'} {...props} />
    </Stack>
  );
}

Page.Container = Container;

export default Page;

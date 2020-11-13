import { Box, BoxProps } from '@chakra-ui/core';

const Container = (props: BoxProps) => {
  return <Box maxWidth="6xl" p={2} mx="auto" {...props} />;
};

function Page(props: BoxProps) {
  return <Box bg="appBackground" minH="100vh" w="100%" {...props} />;
}

Page.Container = Container;

export default Page;

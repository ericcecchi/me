import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

export const Theme: React.FC = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

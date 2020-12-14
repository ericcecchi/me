import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

export const Card: React.FC<BoxProps> = props => {
  const bg = useColorModeValue('gray.100', 'brand.700');

  return (
    <Box bg={bg} borderRadius="md" p={5} {...props} />
  )
};

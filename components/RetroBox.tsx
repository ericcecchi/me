import React from 'react';
import { Box, BoxProps, useColorModeValue, useTheme } from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';

export default function RetroBox(props: BoxProps) {
  const theme = useTheme();
  const color2 = getColor(theme, useColorModeValue('purple.300', 'purple.300'));

  return (
    <Box
      border={`4px solid ${color2}`}
      {...props}
    />
  );
}

import React from 'react';
import {
  Heading,
  HeadingProps,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';

export default function RetroHeading(props: HeadingProps) {
  const theme = useTheme();
  const color = getColor(theme, useColorModeValue('purple.900', 'white'));
  const color1 = getColor(theme, useColorModeValue('white', 'brand.800'));
  const color2 = getColor(theme, useColorModeValue('pink.200', 'pink.600'));
  const color3 = getColor(theme, useColorModeValue('cyan.400', 'cyan.500'));

  return (
    <Heading
      size="2xl"
      color={color}
      lineHeight="shorter"
      fontWeight="bold"
      textShadow={`1px 1px ${color1}, 2px 2px ${color3}, 4px 4px ${color2}`}
      {...props}
    />
  );
}

import React from 'react';
import { Link, LinkProps, useColorModeValue } from '@chakra-ui/react';

export default function Anchor(props: LinkProps) {
  const color = useColorModeValue('cyan.700', 'cyan.300');
  return (
    <Link
      color={props.layerStyle ? undefined : color}
      textDecoration="underline"
      {...props}
    />
  );
}

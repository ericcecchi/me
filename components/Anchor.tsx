import { Link, LinkProps } from '@chakra-ui/core';

export default function Anchor(props: LinkProps) {
  return <Link color="cyan.300" textDecoration="underline" {...props} />;
}

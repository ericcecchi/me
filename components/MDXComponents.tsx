import React from 'react';
import {
  Heading,
  HeadingProps,
  Image,
  ImageProps,
  Text,
  TextProps,
  Divider,
  DividerProps,
  Code,
  UnorderedList,
  OrderedList,
  ListItem,
  ListProps,
} from '@chakra-ui/react';
import * as CharkraComponents from '@chakra-ui/react';
import Anchor from './Anchor';
import CodeBlock from './Codeblock';
import Link from 'next/link';
import { FormattedDate } from './FormattedDate';
import RetroHeading from './RetroHeading';
import TimelineCard from './TimelineCard';

const MDXComponents = {
  ...CharkraComponents,
  h1: (props: HeadingProps) => <RetroHeading mb={[10, null, 12]} {...props} />,
  h2: (props: HeadingProps) => (
    <Heading
      as="h2"
      size="lg"
      mt={[8, null, 10]}
      mb={[4, null, 6]}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <Heading as="h3" size="md" mt={[6, null, 8]} mb={[3, null, 4]} {...props} />
  ),
  img: (props: ImageProps) => <Image my={6} {...props} />,
  p: (props: TextProps) => (
    <Text
      fontSize={['md', null, 'lg']}
      lineHeight={['tall', null, 'taller']}
      mb={[4, null, 6]}
      {...props}
    />
  ),
  hr: (props: DividerProps) => <Divider my={8} {...props} />,
  code: Code,
  pre: CodeBlock,
  ul: (props: ListProps) => <UnorderedList spacing={3} {...props} />,
  ol: (props: ListProps) => <OrderedList fontSize={['md', null, 'lg']} mb={[4, null, 6]} spacing={3} {...props} />,
  li: ListItem,
  a: Anchor,
  Link,
  Date: FormattedDate,
  TimelineCard,
};

export const TimelineComponents = {
  ...MDXComponents,
  h2: (props: HeadingProps) => <Heading as="h2" size="md" {...props} />,
  p: (props: TextProps) => (
    <Text fontSize={['sm', null, 'md']} mt={[4, null, 6]} {...props} />
  ),
};

export default MDXComponents;

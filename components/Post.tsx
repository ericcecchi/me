import React from 'react';
import MDXComponents from './MDXComponents';
import RetroHeading from './RetroHeading';
import hydrate from 'next-mdx-remote/hydrate';
import { Text, useColorModeValue, Flex } from '@chakra-ui/react';
import Avatar from './Avatar';
import { FormattedDate } from './FormattedDate';

export const Post: React.FC<{ post: Post }> = ({ post }) => {
  const content = hydrate(post.content, { components: MDXComponents });
  const subtextColor = useColorModeValue('gray.600', 'whiteAlpha.800');

  return (
    <article>
      <RetroHeading as="h1" mb={3}>
        {post.title}
      </RetroHeading>

      <Text color={subtextColor} mb={10} fontSize="sm">
        <Flex align="center">
          <Avatar size="2xs" mr={1} /> Eric Cecchi •{' '}
          <FormattedDate>{post.date}</FormattedDate>• {post.stats.text}
        </Flex>
      </Text>

      {content}
    </article>
  );
};

export default Post;

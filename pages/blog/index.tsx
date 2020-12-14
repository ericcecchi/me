import hydrate from 'next-mdx-remote/hydrate';
import { NextSeo } from 'next-seo';
import Anchor from '../../components/Anchor';
import Page from '../../components/Page';
import { getAllPosts } from '../../lib/getAllPosts';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import RetroHeading from '../../components/RetroHeading';
import NextLink from 'next/link';
import { FormattedDate } from '../../components/FormattedDate';

const Blog: React.FC<{
  posts: Post[];
  prevPosts: number;
  nextPosts: number;
}> = ({ posts, prevPosts, nextPosts }) => {
  const subtextColor = useColorModeValue('brand.800', 'whiteAlpha.800');

  return (
    <Page>
      <NextSeo
        title="Blog"
        description="I don't write often, but when I do, it's thoroughly medicore."
      />

      <Page.Container py={8} px={3}>
        <RetroHeading mb={16}>Blog</RetroHeading>

        <Stack spacing={10}>
          {posts &&
            posts.map((post) => {
              const content = hydrate(post.excerpt);
  
              return (
                <Box as="article" key={post.slug}>
                  <Flex justifyContent="space-between">
                    <Heading
                      as="h2"
                      pb={2}
                      position="relative"
                      size="md"
                    >
                      <NextLink href={'/blog/' + post.slug}>
                        {post.title}
                      </NextLink>
                    </Heading>

                    {post.date && (
                      <FormattedDate color={subtextColor} fontSize="sm">
                        {post.date}
                      </FormattedDate>
                    )}
                  </Flex>

                  {post.coverImage && (
                    <Image
                      mt={2}
                      mb={3}
                      border={'1px solid'}
                      borderColor={'rgba(0,0,0,.1)'}
                      src={post.coverImage}
                      alt={post.coverImageAlt || ''}
                    />
                  )}

                  {post.excerpt && (
                    <Text color={subtextColor}>{content}</Text>
                  )}
                </Box>
              );
            })}
        </Stack>

        <Flex fontStyle="italic">
          <Box width="50%" py={3} textAlign="left">
            {prevPosts !== null && (
              <Anchor as={NextLink} href={'/blog/' + prevPosts}>
                « see newer posts
              </Anchor>
            )}
          </Box>

          <Box width="50%" py={3} pr={3} textAlign="right">
            {nextPosts !== null && (
              <Anchor as={NextLink} href={'/blog/' + nextPosts}>
                see older posts »
              </Anchor>
            )}
          </Box>
        </Flex>
      </Page.Container>
    </Page>
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'coverImageAlt',
    'excerpt',
    'draft',
  ]);
  const startIndex = 0;
  const endIndex = 10;
  const prevPosts = null;
  const nextPosts = endIndex >= posts.length ? null : 2;
  return {
    props: { posts: posts.slice(startIndex, endIndex), prevPosts, nextPosts },
  };
}

export default Blog;

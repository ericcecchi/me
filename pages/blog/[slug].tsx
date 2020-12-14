import { NextSeo } from 'next-seo';
import React from 'react';
import { getAllPosts, getPostBySlug } from '../../lib/getAllPosts';
import Page from '../../components/Page';
import Post from '../../components/Post';
import { GetStaticProps } from 'next';

const PostPage: React.FC<{ post: Post }> = ({ post }) => (
  <Page>
    <NextSeo
      title={post.title}
      description={post.excerpt}
    />

    <Page.Container>
      <Post post={post} />
    </Page.Container>
  </Page>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug, [
    'title',
    'excerpt',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'coverImageAlt',
    'draft',
    'stats',
  ]);
  return {
    props: { post },
  };
};

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug']);
  return {
    paths: posts.map((post) => {
      return {
        params: { ...post },
      };
    }),
    fallback: false,
  };
}

export default PostPage;

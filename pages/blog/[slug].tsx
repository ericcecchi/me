import { NextSeo } from 'next-seo';
import { getAllPosts, getPostBySlug } from '../../lib/getAllPosts';
import { Page } from '../../components/page';
import Post from '../../components/post';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title={post.title ?? undefined}
        description={post.excerpt.compiledSource}
      />

      <Page>
        <Post post={post} />
      </Page>
    </>
  );
}

export const getStaticProps = (async ({ params }) => {
  if (!params) {
    throw new Error('Params are required');
  }
  if (typeof params.slug !== 'string') {
    throw new Error('Slug must be a string');
  }
  const post = await getPostBySlug(params.slug);
  return {
    props: { post },
  };
}) satisfies GetStaticProps;

export async function getStaticPaths() {
  const posts = await getAllPosts();
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

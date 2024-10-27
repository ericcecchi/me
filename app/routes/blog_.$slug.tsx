import { getPostBySlug } from '~/lib/posts.server';
import { Page } from '~/components/page';
import Post from '~/components/post';
import { json, LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  return [
    {
      name: 'description',
      content: data.post.excerpt.compiledSource,
    },
    {
      property: 'og:title',
      content: data.post.title,
    },
    {
      property: 'og:description',
      content: data.post.excerpt.compiledSource,
    },
    {
      title: data.post.title,
    },
  ];
};

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Post post={post} />
    </Page>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params) {
    throw new Response('Params are required', { status: 400 });
  }
  if (typeof params.slug !== 'string') {
    throw new Response('Slug must be a string', { status: 400 });
  }
  const post = await getPostBySlug(params.slug);
  return json({ post });
}

import { getPostBySlug } from '~/lib/posts.server';
import { Page } from '~/components/page';
import Post from '~/components/post';
import { JsonLd } from '~/components/json-ld';
import { LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';
import {
  blogPostingLd,
  cachedPageHeaders,
  pageMeta,
  plainText,
} from '~/lib/seo';

// The date as written in the post's front matter (yyyy-MM-dd), with no time
// the page doesn't show.
function publishedDate(iso: string) {
  return iso.slice(0, 10);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) return [];
  const { post } = data;

  return pageMeta({
    title: post.title,
    description: plainText(post.excerpt ?? ''),
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: publishedDate(post.date),
  });
};

export const headers = cachedPageHeaders;

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <Page>
      <JsonLd
        data={blogPostingLd({
          slug: post.slug,
          title: post.title,
          description: plainText(post.excerpt ?? ''),
          date: publishedDate(post.date),
        })}
      />
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
  if (!post) {
    throw new Response('Post not found', { status: 404 });
  }

  return { post };
}

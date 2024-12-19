import { Page } from '~/components/page';
import { ComponentProps } from 'react';
import { PageTitle } from '~/components/page-title';
import { FormattedDate } from '~/components/formatted-date';
import { MDXComponents } from '~/components/mdx-components';
import { MDXRemote } from 'next-mdx-remote';
import { Card } from '~/components/card';
import { Anchor } from '~/components/anchor';
import { useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import { getPostExcerpts } from '~/lib/posts.server';

export const meta = [
  {
    title: 'Blog',
    description:
      "I don't write often, but when I do, it's thoroughly mediocre.",
  },
];

export default function Blog() {
  const { posts, prevPosts, nextPosts } = useLoaderData<typeof loader>();
  return (
    <Page>
      <div className="space-y-6">
        <PageTitle>Blog</PageTitle>

        {posts &&
          posts.map((post) => {
            return (
              <Card key={post.slug}>
                <article>
                  <header>
                    {post.date && (
                      <FormattedDate
                        from={new Date(post.date)}
                        to="MMMM d, yyyy"
                        className="text-sm text-muted-600 dark:text-muted-400"
                      />
                    )}

                    <h2 className="text-xl font-semibold my-2">
                      &gt;{' '}
                      <Anchor to={'/blog/' + post.slug}>{post.title}</Anchor>
                    </h2>
                  </header>

                  {post.coverImage && (
                    <img src={post.coverImage} alt={post.coverImageAlt || ''} />
                  )}

                  {post.excerpt && (
                    <MDXRemote
                      {...post.excerpt}
                      components={{
                        ...MDXComponents,
                        p: (props: ComponentProps<'p'>) => <p {...props} />,
                      }}
                    />
                  )}
                </article>
              </Card>
            );
          })}
      </div>

      <div className="flex justify-between m-6">
        <div>
          {prevPosts !== null && (
            <Anchor href={`/app/routes/blog/?page=${prevPosts}`}>
              « see newer posts
            </Anchor>
          )}
        </div>

        <div>
          {nextPosts !== null && (
            <Anchor href={`/app/routes/blog/?page=${nextPosts}`}>
              see older posts »
            </Anchor>
          )}
        </div>
      </div>
    </Page>
  );
}

export async function loader() {
  const posts = await getPostExcerpts();
  const startIndex = 0;
  const endIndex = 10;
  const prevPosts = null;
  const nextPosts = endIndex >= posts.length ? null : 2;
  return json({
    posts: posts.slice(startIndex, endIndex),
    prevPosts,
    nextPosts,
  });
}

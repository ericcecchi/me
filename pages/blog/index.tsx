import { NextSeo } from 'next-seo';
import { Page } from '../../components/page';
import { getAllPosts } from '../../lib/getAllPosts';
import React from 'react';
import { PageTitle } from '../../components/page-title';
import NextLink from 'next/link';
import { FormattedDate } from '../../components/formatted-date';
import { InferGetStaticPropsType } from 'next';
import { MDXComponents } from '../../components/mdx-components';
import { MDXRemote } from 'next-mdx-remote';
import { Card } from '../../components/card';
import { Anchor } from '../../components/anchor';

function Blog({
  posts,
  prevPosts,
  nextPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title="Blog"
        description="I don't write often, but when I do, it's thoroughly medicore."
      />

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
                          to="MMMM d, yyyy"
                          className="text-sm text-muted"
                        >
                          {post.date}
                        </FormattedDate>
                      )}

                      <h2 className="text-xl font-semibold mb-2">
                        <Anchor href={'/blog/' + post.slug}>
                          &gt; {post.title}
                        </Anchor>
                      </h2>
                    </header>

                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt || ''}
                      />
                    )}

                    {post.excerpt && (
                      <MDXRemote
                        {...post.excerpt}
                        components={{
                          ...MDXComponents,
                          p: (props: React.ComponentProps<'p'>) => (
                            <p {...props} />
                          ),
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
              <NextLink href={`/blog/?page=${prevPosts}`}>
                « see newer posts
              </NextLink>
            )}
          </div>

          <div>
            {nextPosts !== null && (
              <NextLink href={`/blog/?page=${nextPosts}`}>
                see older posts »
              </NextLink>
            )}
          </div>
        </div>
      </Page>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  const startIndex = 0;
  const endIndex = 10;
  const prevPosts = null;
  const nextPosts = endIndex >= posts.length ? null : 2;
  return {
    props: { posts: posts.slice(startIndex, endIndex), prevPosts, nextPosts },
  };
}

export default Blog;

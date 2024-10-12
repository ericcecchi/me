import { MDXComponents } from './mdx-components';
import { PageTitle } from './page-title';
import { MDXRemote } from 'next-mdx-remote';
import { Avatar } from './avatar';
import { FormattedDate } from './formatted-date';
import { getStaticProps } from '../pages/blog/[slug]';
import { InferGetStaticPropsType } from 'next';

export function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { content } = post;
  return (
    <article>
      <div className="space-y-6 mb-12">
        <PageTitle>{post.title}</PageTitle>

        <div className="flex items-center space-x-2 text-sm text-muted">
          <Avatar className="w-6 h-6 border-2" />
          <span>Eric Cecchi</span>
          <span>•</span>
          <FormattedDate to="MMMM d, yyyy">{post.date ?? ''}</FormattedDate>
          <span>•</span>
          <span>{post.stats.text}</span>
        </div>
      </div>

      <MDXRemote {...content} components={MDXComponents} />
    </article>
  );
}

export default Post;

import readingTime from 'reading-time';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkCodeTitles from 'remark-code-titles';
import remarkCapitalize from 'remark-capitalize';
import remarkSmartypants from 'remark-smartypants';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaid';

const postsDirectory = join(process.cwd(), 'app/posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((fn) => fn.match(/\.mdx?$/));
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const filename = getPostSlugs().find((fn) => fn.includes(slug));

  const fullPath = join(postsDirectory, filename!);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content, excerpt } = matter(fileContents);
  const postData = data as Record<string, string | undefined>;
  const contentMdx = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkCodeTitles,
        remarkCapitalize,
        remarkSmartypants,
        remarkGfm,
      ],
      rehypePlugins: [rehypeAutolinkHeadings, rehypeHighlight, rehypeMermaid],
    },
    scope: postData,
  });

  return {
    title: postData.title ?? null,
    slug: realSlug,
    excerpt: postData.excerpt ?? excerpt ?? null,
    content: contentMdx,
    date: postData.date,
    coverImage: postData.coverImage ?? null,
    coverImageAlt: postData.coverImageAlt ?? null,
    stats: readingTime(content),
  };
}

export async function getPostExcerptBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const filename = getPostSlugs().find((fn) => fn.includes(slug));

  const fullPath = join(postsDirectory, filename!);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, excerpt } = matter(fileContents);
  const postData = data as Record<string, string | undefined>;

  const excerptMdx = await serialize(postData.excerpt ?? excerpt ?? '', {
    mdxOptions: {
      remarkPlugins: [remarkSmartypants],
    },
    scope: postData,
  });

  return {
    title: postData.title ?? null,
    slug: realSlug,
    excerpt: excerptMdx,
    date: postData.date,
    coverImage: postData.coverImage ?? null,
    coverImageAlt: postData.coverImageAlt ?? null,
  };
}

export async function getPostExcerpts() {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostExcerptBySlug(slug)),
  );
  return posts.sort((post1, post2) =>
    (post1.date ?? '') > (post2.date ?? '') ? -1 : 1,
  );
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts.sort((post1, post2) =>
    (post1.date ?? '') > (post2.date ?? '') ? -1 : 1,
  );
}

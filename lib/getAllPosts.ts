import readingTime from 'reading-time';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkCodeTitles from 'remark-code-titles';
import remarkCapitalize from 'remark-capitalize';
import remarkSmartypants from '@silvenon/remark-smartypants';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const postsDirectory = join(process.cwd(), 'pages/_posts');
const pagesDirectory = join(process.cwd(), 'pages');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((fn) => fn.match(/\.mdx?$/));
}

export function getPageSlugs() {
  return fs.readdirSync(pagesDirectory).filter((fn) => fn.match(/\.mdx?$/));
}

export function getAllSlugs() {
  return getPageSlugs().concat(getPostSlugs());
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  let isPage = false;
  let filename = getPostSlugs().find((fn) => fn.includes(slug));
  if (!filename) {
    filename = getPageSlugs().find((fn) => fn.includes(slug));
    isPage = true;
  }

  const fullPath = join(isPage ? pagesDirectory : postsDirectory, filename!);
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
      rehypePlugins: [rehypeAutolinkHeadings],
    },
    scope: postData,
  });

  const excerptMdx = await serialize(postData.excerpt ?? excerpt ?? '', {
    mdxOptions: {
      remarkPlugins: [remarkSmartypants],
    },
    scope: postData,
  });

  return {
    title: postData.title ?? null,
    slug: realSlug,
    content: contentMdx,
    excerpt: excerptMdx,
    date: postData.date,
    coverImage: postData.coverImage ?? null,
    coverImageAlt: postData.coverImageAlt ?? null,
    stats: readingTime(content),
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts.sort((post1, post2) =>
    (post1.date ?? '') > (post2.date ?? '') ? -1 : 1,
  );
}

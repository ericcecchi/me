import readingTime from 'reading-time';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import MDXComponents from '../components/MDXComponents';

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

export async function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  let isPage = false;
  let filename = getPostSlugs().find((fn) => fn.includes(slug));
  if (!filename) {
    filename = getPageSlugs().find((fn) => fn.includes(slug));
    isPage = true;
  }

  const fullPath = join(isPage ? pagesDirectory : postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content, excerpt } = matter(fileContents);
  const contentMdx = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        import('remark-code-titles'),
        import('remark-capitalize'),
        import('@silvenon/remark-smartypants'),
      ],
      rehypePlugins: [import('rehype-autolink-headings')],
    },
    scope: data,
  });

  const excerptMdx = await renderToString(data.excerpt || excerpt, {
    mdxOptions: {
      remarkPlugins: [import('@silvenon/remark-smartypants')],
    },
    scope: data,
  });
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    } else if (field === 'content') {
      items[field] = contentMdx;
    } else if (field === 'excerpt') {
      items[field] = excerptMdx;
    } else if (field === 'date' && data[field]) {
      items[field] = data[field] + 'T12:00:00-06:00';
    } else if (field === 'stats') {
      items[field] = readingTime(content);
    } else if (data[field]) {
      items[field] = data[field];
    }
  });
  return items;
}

export async function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, fields))
  );
  return posts.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
}

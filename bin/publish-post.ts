import { parse } from 'date-fns';
import { prisma } from '../app/lib/db';
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkCapitalize from 'remark-capitalize';
import remarkCodeTitles from 'remark-code-titles';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';

async function getPostFromFilePath(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const filename = filePath.split('/').pop()!;
  const slug = filename.replace(/\.mdx?$/, '');
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
      rehypePlugins: [rehypeAutolinkHeadings, rehypeHighlight],
    },
  });

  return {
    title: postData.title!,
    slug,
    excerpt: postData.excerpt ?? excerpt ?? null,
    content: contentMdx,
    date: postData.date!,
    coverImage: postData.coverImage ?? null,
    coverImageAlt: postData.coverImageAlt ?? null,
    stats: readingTime(content),
  };
}

/**
 * Given a file path, read the file and create a new post in the database.
 */
async function main() {
  const file = process.argv[2];
  const post = await getPostFromFilePath(file);
  await prisma.post.upsert({
    where: {
      slug: post.slug,
    },
    update: {
      title: post.title,
      slug: post.slug,
      content: post.content.compiledSource,
      date: parse(post.date, 'yyyy-MM-dd', new Date()),
      excerpt: post.excerpt,
      published: true,
      stats: post.stats,
    },
    create: {
      title: post.title,
      slug: post.slug,
      content: post.content.compiledSource,
      date: parse(post.date, 'yyyy-MM-dd', new Date()),
      excerpt: post.excerpt,
      published: true,
      stats: post.stats,
    },
  });
}

main();

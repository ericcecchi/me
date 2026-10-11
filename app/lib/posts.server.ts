import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import remarkCapitalize from 'remark-capitalize';
import remarkCodeTitles from 'remark-code-titles';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';

// Posts live in the repo as posts/<slug>.md, so a post ships by pull request
// and no database credential is involved. Vite reads them into the server
// bundle at build time; nothing touches the file system at request time.
const files = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

type FrontMatter = {
  title?: string;
  date?: string | Date;
  excerpt?: string;
  // Set `published: false` to keep a draft in the repo without serving it.
  published?: boolean;
  coverImage?: string;
  coverImageAlt?: string;
};

export type PostExcerpt = {
  slug: string;
  title: string;
  excerpt: string | null;
  date: string;
  coverImage: string | null;
  coverImageAlt: string | null;
};

type PostMeta = PostExcerpt & {
  published: boolean;
  body: string;
  stats: ReturnType<typeof readingTime>;
};

function toIsoDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  // 'yyyy-MM-dd' is read as UTC midnight, which is how the pages format it.
  return new Date(value).toISOString();
}

function parsePost(path: string, source: string): PostMeta {
  const slug = path
    .split('/')
    .pop()!
    .replace(/\.mdx?$/, '');
  const { data, content } = matter(source);
  const fm = data as FrontMatter;

  if (!fm.title || !fm.date) {
    throw new Error(
      `posts/${slug}.md needs a title and a date in its front matter`,
    );
  }

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt ?? null,
    date: toIsoDate(fm.date),
    coverImage: fm.coverImage ?? null,
    coverImageAlt: fm.coverImageAlt ?? null,
    published: fm.published !== false,
    body: content,
    stats: readingTime(content),
  };
}

const allPosts = Object.entries(files)
  .map(([path, source]) => parsePost(path, source))
  .sort((a, b) => b.date.localeCompare(a.date));

const compiled = new Map<string, Promise<string>>();

function compile(post: PostMeta) {
  let result = compiled.get(post.slug);
  if (!result) {
    result = serialize(post.body, {
      // Posts are reviewed repo content, not user input. The Mermaid diagram in
      // 'how-engagement-uses-configuration-to-power-features' passes its chart
      // as a JS expression, which next-mdx-remote 6 drops unless this is off.
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [
          remarkCodeTitles,
          remarkCapitalize,
          remarkSmartypants,
          remarkGfm,
        ],
        rehypePlugins: [rehypeAutolinkHeadings, rehypeHighlight],
      },
    }).then((mdx) => mdx.compiledSource);
    compiled.set(post.slug, result);
  }
  return result;
}

export async function getPostBySlug(slug: string) {
  // Drafts must not be reachable by URL: only published posts are returned,
  // so the route's 404 handles an unpublished slug the same as a missing one.
  const post = allPosts.find((p) => p.slug === slug && p.published);
  if (!post) return null;

  const { body: _body, published: _published, ...rest } = post;
  return { ...rest, content: await compile(post) };
}

export async function getPostExcerpts(): Promise<PostExcerpt[]> {
  return allPosts
    .filter((post) => post.published)
    .map(({ slug, title, excerpt, date, coverImage, coverImageAlt }) => ({
      slug,
      title,
      excerpt,
      date,
      coverImage,
      coverImageAlt,
    }));
}

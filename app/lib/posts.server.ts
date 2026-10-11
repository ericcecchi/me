import { prisma } from './db';

export async function getPostBySlug(slug: string) {
  // Drafts must not be reachable by URL: only published posts are returned,
  // so the route's 404 handles an unpublished slug the same as a missing one.
  return prisma.post.findFirst({
    where: {
      slug,
      published: true,
    },
  });
}

export async function getPostExcerpts() {
  return prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      date: true,
      coverImage: true,
      coverImageAlt: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
}

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: {
      date: 'desc',
    },
  });
}

import { prisma } from './db';

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: {
      slug,
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

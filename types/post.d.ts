interface Post {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  coverImage?: string;
  coverImageAlt?: string;
  stats: IReadTimeResults;
}

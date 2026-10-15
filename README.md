# ericcecchi.com

Eric Cecchi's personal site: Remix on Vite, deployed on Vercel. There is no database. Posts and the
career timeline live in this repo, so a change ships by pull request.

## Posts

Each post is a Markdown (MDX) file at `posts/<slug>.md`; the file name is the URL (`/blog/<slug>`).

```
---
title: 'The post title'
date: '2026-10-11'
excerpt: 'One or two sentences. It is the blog index text and the meta description.'
---

Body in Markdown.
```

- `date` is `yyyy-MM-dd`. The blog index and the sitemap sort by it, newest first.
- Add `published: false` to keep a draft in the repo without serving it. An unpublished slug answers
  404 and stays out of the blog index and the sitemap. Remove the line to publish.
- Optional: `coverImage` and `coverImageAlt`.
- Posts are reviewed repo content, so MDX may use JS expressions and the components in
  `app/components/mdx-components.tsx` (`Mermaid`, `Interwebz`, `InterwebzNoSteps`).

## Timeline

The `/work` timeline is `events.json`. Each entry has `date`, `title`, `content`, `link`
(`{ "href", "text" }` or `null`) and `type` (`event` or `quote`). Entries show newest first.

## Search metadata

`app/lib/seo.ts` builds every page's title, description, canonical URL, Open Graph tags, and
structured data (`ProfilePage` and `Person` on `/`, `BlogPosting` on each post). A new route calls
`pageMeta()` with a fixed path and exports `headers = cachedPageHeaders`. Canonicals always use
`https://www.ericcecchi.com`. A post's `excerpt` becomes its meta description with any Markdown
marks removed.

## Fonts

Fira Mono is self-hosted from `app/fonts/` (SIL Open Font License, `app/fonts/OFL.txt`), so no
font service sees a visitor's request. The `@font-face` rules are at the top of `app/global.css`.

## Develop

```
npm ci
npm run dev
npm run typecheck
npm run build
```

Posts and `events.json` are read into the server bundle at build time, so restart the dev server or
rebuild after editing them.

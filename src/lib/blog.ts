import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Devlog posts, newest first.
 *
 * Drafts (`draft: true`) are visible while developing (`npm run dev`) so you
 * can preview them, but are excluded from production builds — so they never
 * publish until you set `draft: false`.
 */
export async function getDevlogPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

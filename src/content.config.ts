import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The Anarchy dev blog. Posts are Markdown files in src/content/blog/.
// The entry `id` is derived from the filename (e.g. 2026-06-28-starting-anarchy),
// which becomes the URL slug at /anarchy/<id>.
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };

#!/usr/bin/env node
// Scaffold a new Anarchy devlog post.
//
//   npm run new-post -- "My Post Title"
//   npm run new-post -- "My Post Title" "A one-line summary."
//
// Creates src/content/blog/<YYYY-MM-DD>-<slug>.md with the frontmatter the
// blog content collection expects (see src/content.config.ts). The post is
// created as a draft (draft: true) so it won't publish until you flip it.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, writeFileSync } from "node:fs";

const BLOG_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "content",
  "blog",
);

/** Turn a title into a URL-safe slug: lowercase, hyphenated, alphanumeric. */
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "") // drop apostrophes/quotes outright
    .replace(/[^a-z0-9]+/g, "-") // anything else becomes a hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

/** Today's date as YYYY-MM-DD in the local timezone. */
function today() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Escape a string for use inside a YAML double-quoted scalar. */
function yamlString(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const [title, description] = process.argv.slice(2);

if (!title) {
  console.error('Usage: npm run new-post -- "Post Title" ["Short description"]');
  process.exit(1);
}

const slug = slugify(title);
if (!slug) {
  console.error(`Could not derive a slug from title: ${JSON.stringify(title)}`);
  process.exit(1);
}

const date = today();
const filename = `${date}-${slug}.md`;
const filepath = join(BLOG_DIR, filename);

if (existsSync(filepath)) {
  console.error(`Post already exists: src/content/blog/${filename}`);
  console.error("Pick a different title or edit the existing file.");
  process.exit(1);
}

const desc = description ?? "TODO: one-line summary (shown in the list + meta).";

const contents = `---
title: ${yamlString(title)}
description: ${yamlString(desc)}
pubDate: ${date}
draft: true
---

Write your post here. Markdown works: **bold**, _italic_, [links](https://example.com),
\`code\`, lists, and ## headings.

When it's ready to publish, set \`draft: true\` to \`false\`, then commit and push.
`;

writeFileSync(filepath, contents, "utf8");

console.log(`Created src/content/blog/${filename}`);
console.log(`URL when published: /anarchy/${date}-${slug}`);
console.log("");
console.log("Next:");
console.log(`  1. Edit src/content/blog/${filename}`);
console.log("  2. Set draft: false when ready");
console.log("  3. git add -A && git commit && git push  (auto-deploys)");

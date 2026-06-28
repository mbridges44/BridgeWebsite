---
name: new-post
description: Use when starting a new Anarchy devlog post / blog entry for this site, or when asked to draft, scaffold, or add a new post. Creates the dated Markdown file with correct frontmatter.
---

# New Anarchy devlog post

Scaffolds a new devlog post as a draft Markdown file in `src/content/blog/`,
with a date-prefixed filename and the frontmatter the content collection
requires (`src/content.config.ts`).

## How to run

```bash
npm run new-post -- "Post Title"
npm run new-post -- "Post Title" "A one-line summary for the list + meta."
```

- If no title was given, ask the user for one before running.
- The description is optional; when omitted the file gets a `TODO` placeholder.
- The script prints the created path and the URL the post will have.

## What it generates

`src/content/blog/<YYYY-MM-DD>-<slug>.md` (date = today, slug from the title):

```markdown
---
title: "Post Title"
description: "A one-line summary for the list + meta."
pubDate: 2026-06-28
draft: true
---

Write your post here. Markdown works...
```

Frontmatter fields (all validated at build time):

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Shown as the headline. |
| `description` | yes | One line; shown in the devlog list and as the meta description. |
| `pubDate` | yes | `YYYY-MM-DD`. Set automatically to today; edit if backdating. |
| `draft` | no | Defaults to `true`. Drafts show in `npm run dev` but are excluded from the deployed site until set to `false`. |

## After scaffolding

1. Edit the new file and write the post body (plain Markdown).
2. Set `draft: true` → `draft: false` when it's ready to publish.
3. Commit and push — the GitHub Actions workflow auto-deploys.

## Notes

- The script never overwrites an existing file; it errors if one already exists.
- Preview locally with `npm run dev` — drafts are visible there. The deployed
  site (and `npm run build`) excludes drafts and shows posts newest-first.
- If a freshly created post doesn't appear in an already-running dev server,
  restart it (`npm run astro -- dev stop`, then `npm run dev`).

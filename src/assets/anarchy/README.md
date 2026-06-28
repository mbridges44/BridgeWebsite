# Anarchy devlog images

Put images for devlog posts here. Astro optimizes anything under `src/`
automatically (resizes, converts to WebP, lazy-loads, fingerprints the file).

## Reference one from a post

Posts live in `src/content/blog/`, so the relative path back up to here is
`../../assets/anarchy/`:

```markdown
![Combat prototype](../../assets/anarchy/combat-prototype.png)
```

- The `![...]` text is the alt text — always write something descriptive.
- Images render responsively (the post styles cap them at the column width).

## When NOT to use this folder

For an image you DON'T want Astro to process (already-sized, a download, etc.),
put it in `public/` instead and reference it with an absolute path:

```markdown
![Raw screenshot](/anarchy/raw-screenshot.png)   <!-- file at public/anarchy/raw-screenshot.png -->
```

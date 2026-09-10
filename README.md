# Personal website

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html      page structure
style.css       look & feel
site.js         fills the page from content/*.json, theme switch
animations.js   hero helix + orbit backdrop
content/        everything you edit: text, lists, images, CV
```

## Editing

Edit the JSON files in `content/`; the existing entries show the format.

- `site.json` — name, portrait, hero text, links, `settings` (theme, accent colour, motion speed). `headline` is the only field that accepts HTML, for the `<em>` accent word.
- `publications.json` — newest first. Four are shown by default; an empty list hides the section.
- `projects.json` — `"image": null` shows a placeholder.
- `background.json` — `experience` and `education`. `logo` is optional; without it the first letter of `place` is shown. Crop logo files tight to the mark.

## Preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

A server is needed because the page loads JSON with `fetch`.

## Deploy

Upload the folder to any static host.

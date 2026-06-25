# Khang Dang website — consistent visual package

This package uses `khang_dang_news_dropdown_prototype.html` as the visual source of truth.

## How to publish on GitHub Pages

1. Create a GitHub repository, for example `khang-dang-website`.
2. Upload all files in this folder.
3. In GitHub, open **Settings → Pages**.
4. Set the source to the main branch and root folder.
5. Your homepage is `index.html`.

## Structure

- `index.html` — clean landing page
- `about.html` — professional profile and research journey
- `research.html` — research overview with filters
- `research/*.html` — one page per research category
- `publications.html` — publication list with category filters
- `media-coverage.html` — presentations, demos, audio records, and media coverage
- `blog.html` — blog index with filters
- `blog/*.html` — full article pages
- `gallery.html` — vertical video/social gallery
- `news.html` — full news timeline
- `cv.html` — editable CV page
- `contact.html` — contact and profiles
- `assets/css/styles.css` — shared design system copied from the approved prototype
- `assets/js/site.js` — news pause, filtering, gallery modal
- `assets/data/content.json` — editable content backup

## How to add a blog article

1. Copy any file in `blog/`.
2. Change the title, category, summary, and article paragraphs.
3. Add a card for it in `blog.html`.
4. To add a photo, place the image in `assets/images/` and insert:

```html
<figure class="photo-slot">
  <img src="../assets/images/your-image.jpg" alt="Describe the image clearly">
  <figcaption>Optional caption.</figcaption>
</figure>
```

## How to add a research section

1. Create a new file inside `research/`.
2. Add a card in `research.html`.
3. Add a dropdown item in the navigation in each page template, or regenerate from the build script.

## Design rule

Do not redesign individual pages separately. Keep all pages inside the same `.shell`, `.browser-bar`, `.site-header`, `.panel`, `.deep-card`, `.side-panel`, `.button`, and `.tag` system so the interface remains consistent.

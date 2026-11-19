# Serene — Beautiful Life & Style Blog

A responsive React editorial blog inspired by a soft, feminine lifestyle magazine layout. The interface includes a centered wordmark, category navigation, full-width feature story, latest-story cards, author introduction, category index and newsletter signup.

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Or from the repository root:

```bash
npm install
npm run dev --workspace=serene-journal
```

## Build

```bash
npm run build
```

The Vite config reads `APP_BASE_PATH`. The repository workspace build sets it to `/serene-journal/` and copies the output into the root deployment at that path.

## Mock content

`src/services/postsApi.js` reads demo posts from the public DummyJSON endpoint. API IDs, body text and engagement counts are combined with local editorial presentation data (categories, cover photography, excerpts and publication dates). A curated local dataset is used automatically when the API is unavailable.

The API URL can be replaced with `VITE_BLOG_API_URL`. The data adapter is isolated so it can later be switched to a database-backed API without changing the page components.

## Interactions

- Filter stories by category from either navigation area.
- Open the search panel and search titles, excerpts and categories.
- Open a story card to read its article dialog.
- Submit the newsletter form for client-side confirmation.
- Use the responsive category navigation on smaller screens.

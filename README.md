# Marquee : a film search library

A React single-page movie/series search app built on the [OMDb API](https://www.omdbapi.com/). Search by title, filter by type (movie / series / episode), browse results as a poster grid and open a title for full details (plot, cast, director, rating, runtime).

Built with [Vite](https://vitejs.dev/) + React - no backend, just static files after `npm run build`.

## Run it locally

```bash
npm install
npm run dev
# then visit the local URL Vite prints (usually http://localhost:5173)
```

## Get an OMDb API key

1. Go to https://www.omdbapi.com/apikey.aspx
2. Choose the **FREE** tier (1,000 requests/day) and register with your email
3. OMDb emails you a key, activate it via the link in that email
4. Paste the key into the app's "Save key" field the first time you use it (it's saved in your browser's local storage so you only have to do this once per browser)

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Marquee: React OMDb movie search app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main

npm install
npm run build
npx gh-pages -d dist
```


## How it works

- `src/App.jsx` holds search/detail state (React hooks) and talks to OMDb.
- `src/components/` — `SearchBar`, `KeyBanner`, `ResultsSection`, `MovieCard`, `DetailModal`.
- Search hits `GET https://www.omdbapi.com/?apikey=...&s=<term>&type=<type>&page=<n>`.
- Clicking a result hits `GET https://www.omdbapi.com/?apikey=...&i=<imdbID>&plot=full`.
- The API key lives only in `localStorage` on the visitor's own browser — it is never bundled into the code or committed to the repo.

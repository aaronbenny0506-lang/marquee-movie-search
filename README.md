# Marquee — a film search library

A single-page movie/series search app built on the [OMDb API](https://www.omdbapi.com/). Search by title, filter by type (movie / series / episode), browse results as a poster grid, and open a title for full details (plot, cast, director, rating, runtime).

No build step, no dependencies — it's one static `index.html` file, so it deploys anywhere that serves static files.

## Run it locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Get an OMDb API key

1. Go to https://www.omdbapi.com/apikey.aspx
2. Choose the **FREE** tier (1,000 requests/day) and register with your email
3. OMDb emails you a key — activate it via the link in that email
4. Paste the key into the app's "Save key" field the first time you use it (it's saved in your browser's local storage so you only have to do this once per browser)

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Marquee: OMDb movie search app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Deploy from a branch → main / (root)**. GitHub gives you a live URL a minute or two later, typically:

```
https://<your-username>.github.io/<your-repo>/
```

That's the link to share.

## How it works

- `index.html` contains all HTML, CSS, and JS — no framework, no bundler.
- Search hits `GET https://www.omdbapi.com/?apikey=...&s=<term>&type=<type>&page=<n>`.
- Clicking a result hits `GET https://www.omdbapi.com/?apikey=...&i=<imdbID>&plot=full` for full details.
- The API key lives only in `localStorage` on the visitor's own browser — it is never bundled into the code or committed to the repo.

## Credits

Movie data and posters via the [OMDb API](https://www.omdbapi.com/). Not affiliated with IMDb.

import MovieCard from './MovieCard.jsx';

export default function ResultsSection({ status, term, movies, totalResults, onOpen, onLoadMore }) {
  const heading = term ? `Results for “${term}”` : 'Now showing';
  const count = status === 'ready' && totalResults
    ? `${totalResults} title${totalResults === 1 ? '' : 's'}`
    : '';

  return (
    <>
      <section className="section-head">
        <h2>{heading}</h2>
        <span className="result-count">{count}</span>
      </section>

      {status === 'idle' && (
        <div className="state">
          <h3>Nothing on screen yet</h3>
          <p>Type a title above to start searching the OMDb catalog.</p>
        </div>
      )}

      {status === 'need-key' && (
        <div className="state">
          <h3>Add an API key to search</h3>
          <p>Paste a free OMDb API key above, then try your search again.</p>
        </div>
      )}

      {status === 'loading' && (
        <div className="state">
          <h3>Searching…</h3>
          <p>Checking the catalog for “{term}”.</p>
        </div>
      )}

      {status === 'empty' && (
        <div className="state">
          <h3>No matches</h3>
          <p>Nothing came up for “{term}”. Try a different title or spelling.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="state">
          <h3>Something went wrong</h3>
          <p>Could not reach OMDb right now. Check your connection and try again.</p>
        </div>
      )}

      {status === 'bad-key' && (
        <div className="state">
          <h3>That key didn’t work</h3>
          <p>Double-check the API key you pasted in and try again.</p>
        </div>
      )}

      {status === 'ready' && (
        <div className="grid">
          {movies.map((m) => (
            <MovieCard key={m.imdbID} movie={m} onOpen={onOpen} />
          ))}
        </div>
      )}

      {status === 'ready' && movies.length < totalResults && (
        <button className="load-more" onClick={onLoadMore}>Load more</button>
      )}
    </>
  );
}

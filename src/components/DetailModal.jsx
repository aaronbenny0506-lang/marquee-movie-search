import { useEffect } from 'react';
import { posterFallback } from '../posterFallback.js';

export default function DetailModal({ movie, loading, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="stub">
        {loading && (
          <div className="stub-body">
            <p>Loading…</p>
          </div>
        )}

        {!loading && !movie && (
          <div className="stub-body">
            <button className="stub-close" onClick={onClose}>&times;</button>
            <p>Couldn’t load details for this title.</p>
          </div>
        )}

        {!loading && movie && (
          <>
            <img
              className="stub-poster"
              src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : posterFallback(movie.Title)}
              alt={`${movie.Title} poster`}
              onError={(e) => { e.currentTarget.src = posterFallback(movie.Title); }}
            />
            <div className="stub-body">
              <button className="stub-close" onClick={onClose}>&times;</button>
              <h3 className="stub-title">{movie.Title}</h3>
              <p className="stub-sub">
                {movie.Year} &nbsp;&middot;&nbsp; {movie.Rated !== 'N/A' ? `${movie.Rated} · ` : ''}{movie.Runtime}
              </p>
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="stub-rating">IMDb <strong>{movie.imdbRating}/10</strong></div>
              )}
              <p className="stub-plot">{movie.Plot}</p>
              <dl className="stub-facts">
                <div><dt>Genre</dt><dd>{movie.Genre}</dd></div>
                <div><dt>Director</dt><dd>{movie.Director}</dd></div>
                <div><dt>Cast</dt><dd>{movie.Actors}</dd></div>
                <div><dt>Language</dt><dd>{movie.Language}</dd></div>
              </dl>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

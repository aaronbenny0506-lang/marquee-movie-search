import { posterFallback } from '../posterFallback.js';

export default function MovieCard({ movie, onOpen }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : posterFallback(movie.Title);
  const fallback = posterFallback(movie.Title);

  return (
    <div className="card" onClick={() => onOpen(movie.imdbID)}>
      <img
        className="poster"
        src={poster}
        alt={`${movie.Title} poster`}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = fallback; }}
      />
      <div className="card-body">
        <p className="card-title">{movie.Title}</p>
        <div className="card-meta">
          <span>{movie.Year}</span>
          <span>{movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : ''}</span>
        </div>
      </div>
    </div>
  );
}

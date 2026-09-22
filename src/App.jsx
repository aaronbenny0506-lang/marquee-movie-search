import { useCallback, useState } from 'react';
import KeyBanner from './components/KeyBanner.jsx';
import SearchBar from './components/SearchBar.jsx';
import ResultsSection from './components/ResultsSection.jsx';
import DetailModal from './components/DetailModal.jsx';

const API_KEY_STORAGE = 'marquee_omdb_key';

function readStoredKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export default function App() {
  const [apiKey, setApiKey] = useState(readStoredKey);
  const [type, setType] = useState('');
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | need-key | loading | ready | empty | error | bad-key

  const [detailId, setDetailId] = useState(null);
  const [detailMovie, setDetailMovie] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const saveKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem(API_KEY_STORAGE, key); } catch { /* ignore */ }
    if (term) runSearch(term, type, 1, false, key);
  };

  const runSearch = useCallback(async (searchTerm, searchType, searchPage, append, keyOverride) => {
    const key = keyOverride ?? apiKey;
    if (!key) {
      setStatus('need-key');
      return;
    }

    setTerm(searchTerm);
    setType(searchType);
    setPage(searchPage);
    if (!append) setStatus('loading');

    const url = new URL('https://www.omdbapi.com/');
    url.searchParams.set('apikey', key);
    url.searchParams.set('s', searchTerm);
    url.searchParams.set('page', searchPage);
    if (searchType) url.searchParams.set('type', searchType);

    try {
      const res = await fetch(url.toString());
      const data = await res.json();

      if (data.Response === 'False') {
        if (data.Error && data.Error.toLowerCase().includes('invalid api key')) {
          setApiKey('');
          try { localStorage.removeItem(API_KEY_STORAGE); } catch { /* ignore */ }
          setStatus('bad-key');
          return;
        }
        setStatus('empty');
        setMovies([]);
        setTotalResults(0);
        return;
      }

      const total = parseInt(data.totalResults, 10) || 0;
      setTotalResults(total);
      setMovies((prev) => (append ? [...prev, ...data.Search] : data.Search));
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [apiKey]);

  const handleSearch = (searchTerm) => runSearch(searchTerm, type, 1, false);
  const handleTypeChange = (newType) => {
    setType(newType);
    if (term) runSearch(term, newType, 1, false);
  };
  const handleLoadMore = () => runSearch(term, type, page + 1, true);

  const openDetail = async (id) => {
    setDetailId(id);
    setDetailLoading(true);
    setDetailMovie(null);

    const url = new URL('https://www.omdbapi.com/');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('i', id);
    url.searchParams.set('plot', 'full');

    try {
      const res = await fetch(url.toString());
      const data = await res.json();
      setDetailMovie(data.Response === 'False' ? null : data);
    } catch {
      setDetailMovie(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setDetailId(null);
    setDetailMovie(null);
  };

  return (
    <div className="wrap">
      <header className="marquee">
        <div className="marquee-lights"></div>
        <div className="brandline">
          <div>
            <h1 className="brand">Marquee <span>&amp; co.</span></h1>
            <p className="tagline">A small search library for the films you half-remember.</p>
          </div>
        </div>

        <SearchBar activeType={type} onSearch={handleSearch} onTypeChange={handleTypeChange} />

        {!apiKey && <KeyBanner onSave={saveKey} />}
      </header>

      <ResultsSection
        status={status}
        term={term}
        movies={movies}
        totalResults={totalResults}
        onOpen={openDetail}
        onLoadMore={handleLoadMore}
      />

      <footer>Powered by the OMDb API — data courtesy of omdbapi.com. Not affiliated with IMDb.</footer>

      {detailId && (
        <DetailModal movie={detailMovie} loading={detailLoading} onClose={closeDetail} />
      )}
    </div>
  );
}

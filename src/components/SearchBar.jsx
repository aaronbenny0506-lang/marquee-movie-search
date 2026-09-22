import { useState } from 'react';

const TYPES = [
  { label: 'All', value: '' },
  { label: 'Movies', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episodes', value: 'episode' },
];

export default function SearchBar({ activeType, onSearch, onTypeChange }) {
  const [term, setTerm] = useState('');

  function submit(e) {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <>
      <form className="search-row" onSubmit={submit}>
        <label className="ticket-input">
          <input
            type="text"
            placeholder="Search by title — “Chinatown”, “Paddington”…"
            autoComplete="off"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </label>
        <button className="go" type="submit">Search</button>
      </form>

      <div className="filters">
        {TYPES.map((t) => (
          <button
            key={t.value}
            className={`pill${activeType === t.value ? ' active' : ''}`}
            onClick={() => onTypeChange(t.value)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}

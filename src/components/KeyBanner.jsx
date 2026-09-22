import { useState } from 'react';

export default function KeyBanner({ onSave }) {
  const [value, setValue] = useState('');

  function save() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setValue('');
  }

  return (
    <div className="key-banner">
      <span>
        You'll need a free OMDb API key to search —{' '}
        <a href="https://www.omdbapi.com/apikey.aspx" target="_blank" rel="noopener noreferrer">
          get one here
        </a>
        , then paste it in.
      </span>
      <input
        type="text"
        placeholder="Paste your OMDb API key"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && save()}
      />
      <button type="button" onClick={save}>Save key</button>
    </div>
  );
}

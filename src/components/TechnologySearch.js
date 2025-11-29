import { useState, useEffect, useRef } from 'react';
import './TechnologySearch.css';

function TechnologySearch({ onSearch, placeholder = "Поиск технологий..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    // Очищаем предыдущий таймер
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Устанавливаем новый таймер для debounce (500ms)
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="technology-search">
      <div className="search-input-container">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-button">
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default TechnologySearch;
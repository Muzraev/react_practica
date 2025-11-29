import { useState } from 'react';
import usePublicTechnologies from '../hooks/usePublicTechnologies';
import TechnologySearch from './TechnologySearch';
import './PublicTechnologyList.css';

function PublicTechnologyList({ onImportTechnology }) {
  const { technologies, loading, error, searchTechnologies } = usePublicTechnologies();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query) => {
    if (query.trim()) {
      setIsSearching(true);
      const results = searchTechnologies(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const displayTechnologies = isSearching ? searchResults : technologies;

  if (loading) {
    return (
      <div className="public-technologies-loading">
        <div className="spinner"></div>
        <p>Загрузка технологий из публичного каталога...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-technologies-error">
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="public-technology-list">
      <div className="search-section">
        <TechnologySearch 
          onSearch={handleSearch}
          placeholder="Поиск по названию, описанию или тегам..."
        />
        <div className="search-info">
          {isSearching ? (
            <span>Найдено: {searchResults.length} технологий</span>
          ) : (
            <span>Всего технологий: {technologies.length}</span>
          )}
        </div>
      </div>

      <div className="technologies-grid">
        {displayTechnologies.map(tech => (
          <div key={tech.id} className="public-technology-card">
            <div className="tech-header">
              <h3>{tech.title}</h3>
              <span className={`difficulty difficulty-${tech.difficulty}`}>
                {tech.difficulty === 'beginner' && '👶 Начинающий'}
                {tech.difficulty === 'intermediate' && '🚀 Продвинутый'}
                {tech.difficulty === 'advanced' && '🔥 Эксперт'}
              </span>
            </div>
            
            <p className="tech-description">{tech.description}</p>
            
            <div className="tech-meta">
              <span className="category">{tech.category}</span>
              <div className="tags">
                {tech.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="tech-resources">
              <strong>Ресурсы:</strong>
              <ul>
                {tech.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource} target="_blank" rel="noopener noreferrer">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => onImportTechnology(tech)}
              className="import-button"
            >
              📥 Импортировать в мой трекер
            </button>
          </div>
        ))}
      </div>

      {displayTechnologies.length === 0 && isSearching && (
        <div className="no-results">
          <p>Технологии по вашему запросу не найдены</p>
        </div>
      )}
    </div>
  );
}

export default PublicTechnologyList;
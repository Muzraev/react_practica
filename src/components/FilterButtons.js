import React from 'react';
import './FilterButtons.css';

function FilterButtons({ currentFilter, onFilterChange }) {
    const filters = [
        { key: 'all', label: 'Все', emoji: '📚' },
        { key: 'not-started', label: 'Не начаты', emoji: '⏳' },
        { key: 'in-progress', label: 'В процессе', emoji: '🔄' },
        { key: 'completed', label: 'Выполнены', emoji: '✅' }
    ];

    return (
        <div className="filter-buttons">
            <h3>Фильтр по статусу</h3>
            <div className="filter-options">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => onFilterChange(filter.key)}
                        className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
                    >
                        {filter.emoji} {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterButtons;
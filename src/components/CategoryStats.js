import React from 'react';
import ProgressBar from './ProgressBar';
import './CategoryStats.css';

function CategoryStats({ categoryStats }) {
  const categoryColors = {
    frontend: '#2196F3',
    backend: '#FF9800',
    database: '#F44336',
    tools: '#9C27B0'
  };

  const categoryLabels = {
    frontend: 'Фронтенд',
    backend: 'Бэкенд',
    database: 'Базы данных',
    tools: 'Инструменты'
  };

  return (
    <div className="category-stats">
      <h3>Прогресс по категориям</h3>
      <div className="category-list">
        {Object.entries(categoryStats).map(([category, stats]) => {
          const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          return (
            <div key={category} className="category-item">
              <div className="category-info">
                <span className="category-name">{categoryLabels[category] || category}</span>
                <span className="category-count">{stats.completed}/{stats.total}</span>
              </div>
              <ProgressBar 
                progress={progress}
                height={12}
                color={categoryColors[category] || '#666'}
                showPercentage={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryStats;
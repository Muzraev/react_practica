import { useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Statistics.css';

function Statistics() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const categoryStats = {};
  technologies.forEach(tech => {
    if (!categoryStats[tech.category]) {
      categoryStats[tech.category] = { total: 0, completed: 0 };
    }
    categoryStats[tech.category].total++;
    if (tech.status === 'completed') {
      categoryStats[tech.category].completed++;
    }
  });

  const categoryLabels = {
    frontend: 'Фронтенд',
    backend: 'Бэкенд',
    database: 'Базы данных',
    tools: 'Инструменты'
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Статистика обучения</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Изучено</span>
        </div>
        <div className="stat-card in-progress">
          <span className="stat-number">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-card not-started">
          <span className="stat-number">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
      </div>

      <div className="progress-section">
        <ProgressBar 
          progress={progressPercent}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={25}
        />
      </div>

      <div className="category-stats">
        <h2>Прогресс по категориям</h2>
        {Object.entries(categoryStats).map(([category, stats]) => {
          const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          return (
            <div key={category} className="category-progress">
              <div className="category-info">
                <span className="category-name">
                  {categoryLabels[category] || category}
                </span>
                <span className="category-numbers">
                  {stats.completed}/{stats.total} ({progress}%)
                </span>
              </div>
              <ProgressBar 
                progress={progress}
                height={15}
                showPercentage={false}
                color="#667eea"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Statistics;
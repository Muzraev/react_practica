import React, { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import TechnologyCard from '../components/TechnologyCard';
import QuickActions from '../components/QuickActions';
import FilterButtons from '../components/FilterButtons';
import CategoryStats from '../components/CategoryStats';

function Home() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    progress,
    categoryStats
  } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter(tech => {
    if (filter !== 'all' && tech.status !== filter) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return tech.title.toLowerCase().includes(query) || 
             tech.description.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>
        <p>Добро пожаловать в ваш персональный трекер обучения!</p>
        
        <ProgressBar 
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        />
      </header>

      <CategoryStats categoryStats={categoryStats} />

      <QuickActions 
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        technologies={technologies}
      />

      <FilterButtons 
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-count">
            Найдено: {filteredTechnologies.length}
          </span>
        </div>
      </div>
      
      <main className="main-content">
        <h2>Мой список технологий для изучения</h2>
        
        <div className="tech-list">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              techId={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes}
              category={tech.category}
              onStatusChange={(newStatus) => updateStatus(tech.id, newStatus)}
              onNotesChange={updateNotes}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
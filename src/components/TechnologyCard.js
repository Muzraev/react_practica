import React from 'react';
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ techId, title, description, status, notes, category, onStatusChange, onNotesChange }) {
  const handleClick = () => {
    if (status === 'not-started') {
      onStatusChange('in-progress');
    } else if (status === 'in-progress') {
      onStatusChange('completed');
    } else {
      onStatusChange('not-started');
    }
  };

  let statusIcon = '❓';
  let statusText = 'Неизвестно';
  
  if (status === 'completed') {
    statusIcon = '✅';
    statusText = 'Изучено';
  } else if (status === 'in-progress') {
    statusIcon = '🔄';
    statusText = 'В процессе';
  } else if (status === 'not-started') {
    statusIcon = '⏳';
    statusText = 'Не начато';
  }

  const categoryLabels = {
    frontend: 'Фронтенд',
    backend: 'Бэкенд',
    database: 'Базы данных',
    tools: 'Инструменты'
  };

  return (
    <div className={`tech-card tech-card-${status}`}>
      <div className="tech-main" onClick={handleClick}>
        <div className="tech-header">
          <div>
            <h3>{title}</h3>
            <span className="tech-category">{categoryLabels[category] || category}</span>
          </div>
          <span className="icon">{statusIcon}</span>
        </div>
        <p className="tech-description">{description}</p>
        <div className="tech-status">
          Статус: {statusText}
        </div>
        <p className="click-hint">Нажми чтобы изменить статус</p>
      </div>

      <TechnologyNotes 
        notes={notes}
        onNotesChange={onNotesChange}
        techId={techId}
      />
    </div>
  );
}

export default TechnologyCard;
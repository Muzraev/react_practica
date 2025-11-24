import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-container">
            <h2>Прогресс изучения технологий</h2>
            
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-number">{total}</span>
                    <span className="stat-label">Всего</span>
                </div>
                <div className="stat-item completed">
                    <span className="stat-number">{completed}</span>
                    <span className="stat-label">Изучено</span>
                </div>
                <div className="stat-item in-progress">
                    <span className="stat-number">{inProgress}</span>
                    <span className="stat-label">В процессе</span>
                </div>
                <div className="stat-item not-started">
                    <span className="stat-number">{notStarted}</span>
                    <span className="stat-label">Не начато</span>
                </div>
            </div>
            
            <div className="progress-bar-section">
                <div className="progress-info">
                    <span>Общий прогресс: {progressPercent}% ({completed} из {total})</span>
                </div>
                <div className="progress-bar">
                    <div 
                        className="progress-done" 
                        style={{ width: `${progressPercent}%` }}
                    >
                        {progressPercent}%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;
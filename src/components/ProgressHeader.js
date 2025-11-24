import React from 'react';
import './ProgressHeader.css';

function ProgressHeader(props) {
    const allTechnologies = props.technologies.length;
    const completedTechnologies = props.technologies.filter(tech => tech.status === 'completed').length;
    const inProgressTechnologies = props.technologies.filter(tech => tech.status === 'in-progress').length;
    const notStartedTechnologies = props.technologies.filter(tech => tech.status === 'not-started').length;
    
    const progressPercent = allTechnologies > 0 
        ? Math.round((completedTechnologies / allTechnologies) * 100) 
        : 0;

    return (
        <div className="progress-container">
            <h2>Прогресс изучения технологий</h2>
            
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-number">{allTechnologies}</span>
                    <span className="stat-label">Всего</span>
                </div>
                <div className="stat-item completed">
                    <span className="stat-number">{completedTechnologies}</span>
                    <span className="stat-label">Изучено</span>
                </div>
                <div className="stat-item in-progress">
                    <span className="stat-number">{inProgressTechnologies}</span>
                    <span className="stat-label">В процессе</span>
                </div>
                <div className="stat-item not-started">
                    <span className="stat-number">{notStartedTechnologies}</span>
                    <span className="stat-label">Не начато</span>
                </div>
            </div>
            
            <div className="progress-bar-section">
                <div className="progress-info">
                    <span>Общий прогресс: {progressPercent}%</span>
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
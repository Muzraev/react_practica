import React from 'react';
import './TechnologyCard.css';

function TechnologyCard(props) {
    let statusIcon = '';
    let statusText = '';
    
    if (props.status === 'completed') {
        statusIcon = '✅';
        statusText = 'Изучено';
    } else if (props.status === 'in-progress') {
        statusIcon = '⏳';
        statusText = 'В процессе';
    } else if (props.status === 'not-started') {
        statusIcon = '⏳';
        statusText = 'Не начато';
    }

    return (
        <div className={`tech-card tech-card-${props.status}`}>
            <div className="tech-header">
                <h3>{props.title}</h3>
                <span className="icon">{statusIcon}</span>
            </div>
            <p className="tech-description">{props.description}</p>
            <div className="tech-status">
                Статус: {statusText}
            </div>
        </div>
    );
}

export default TechnologyCard;
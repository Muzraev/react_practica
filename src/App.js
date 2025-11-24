import React from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
    const technologiesData = [
        { 
            id: 1, 
            title: 'React Components', 
            description: 'Изучение базовых компонентов', 
            status: 'completed' 
        },
        { 
            id: 2, 
            title: 'JSX Syntax', 
            description: 'Освоение синтаксиса JSX', 
            status: 'in-progress' 
        },
        { 
            id: 3, 
            title: 'State Management', 
            description: 'Работа с состоянием компонентов', 
            status: 'not-started' 
        }
    ];

    return (
        <div className="App">
            <header className="app-header">
                <h1>Трекер изучения технологий</h1>
                <p>Практические занятия - React.js</p>
            </header>

            <ProgressHeader technologies={technologiesData} />
            
            <main className="main-content">
                <h2>Мой список технологий для изучения</h2>
                
                <div className="tech-list">
                    {technologiesData.map(tech => (
                        <TechnologyCard
                            key={tech.id}
                            title={tech.title}
                            description={tech.description}
                            status={tech.status}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
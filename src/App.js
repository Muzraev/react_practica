import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';

function App() {
    const [technologies, setTechnologies] = useState([
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
        },
        { 
            id: 4, 
            title: 'React Hooks', 
            description: 'Изучение useState и useEffect', 
            status: 'not-started' 
        },
        { 
            id: 5, 
            title: 'Props', 
            description: 'Передача данных между компонентами', 
            status: 'not-started' 
        }
    ]);

    const [filter, setFilter] = useState('all');

    const updateTechnologyStatus = (id, newStatus) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const markAllCompleted = () => {
        setTechnologies(prevTech => 
            prevTech.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies(prevTech => 
            prevTech.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    const pickRandomTechnology = () => {
        const notStarted = technologies.filter(tech => tech.status === 'not-started');
        if (notStarted.length > 0) {
            const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
            updateTechnologyStatus(randomTech.id, 'in-progress');
            alert(`Следующая технология: ${randomTech.title}`);
        } else {
            alert('Все технологии уже начаты!');
        }
    };

    const filteredTechnologies = technologies.filter(tech => {
        if (filter === 'all') return true;
        return tech.status === filter;
    });

    return (
        <div className="App">
            <header className="app-header">
                <h1>Трекер изучения технологий</h1>
                <p>Практические занятия - React</p>
            </header>

            <ProgressHeader technologies={technologies} />
            
            <QuickActions 
                onMarkAllCompleted={markAllCompleted}
                onResetAll={resetAllStatuses}
                onRandomPick={pickRandomTechnology}
            />

            <FilterButtons 
                currentFilter={filter}
                onFilterChange={setFilter}
            />
            
            <main className="main-content">
                <h2>Мой список технологий для изучения</h2>
                
                <div className="tech-list">
                    {filteredTechnologies.map(tech => (
                        <TechnologyCard
                            key={tech.id}
                            title={tech.title}
                            description={tech.description}
                            status={tech.status}
                            onStatusChange={(newStatus) => updateTechnologyStatus(tech.id, newStatus)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
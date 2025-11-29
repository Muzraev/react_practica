import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';

function App() {
    const [technologies, setTechnologies] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Загрузка из localStorage при запуске
    useEffect(() => {
        const savedData = localStorage.getItem('techTrackerData');
        if (savedData) {
            setTechnologies(JSON.parse(savedData));
        } else {
            // Начальные данные если в localStorage ничего нет
            setTechnologies([
                { 
                    id: 1, 
                    title: 'React Components', 
                    description: 'Изучение базовых компонентов', 
                    status: 'completed',
                    notes: '' 
                },
                { 
                    id: 2, 
                    title: 'JSX Syntax', 
                    description: 'Освоение синтаксиса JSX', 
                    status: 'in-progress',
                    notes: '' 
                },
                { 
                    id: 3, 
                    title: 'State Management', 
                    description: 'Работа с состоянием компонентов', 
                    status: 'not-started',
                    notes: '' 
                },
                { 
                    id: 4, 
                    title: 'React Hooks', 
                    description: 'Изучение useState и useEffect', 
                    status: 'not-started',
                    notes: '' 
                },
                { 
                    id: 5, 
                    title: 'Props', 
                    description: 'Передача данных между компонентами', 
                    status: 'not-started',
                    notes: '' 
                }
            ]);
        }
    }, []);

    // Автосохранение в localStorage
    useEffect(() => {
        if (technologies.length > 0) {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        }
    }, [technologies]);

    const updateTechnologyStatus = (id, newStatus) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateTechnologyNotes = (id, newNotes) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === id ? { ...tech, notes: newNotes } : tech
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

    // Фильтрация по статусу и поиску
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
        <div className="App">
            <header className="app-header">
                <h1>Трекер изучения технологий</h1>
                <p>Практическое занятие №21 - useEffect и LocalStorage</p>
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

            {/* Поле поиска */}
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
                            onStatusChange={(newStatus) => updateTechnologyStatus(tech.id, newStatus)}
                            onNotesChange={updateTechnologyNotes}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
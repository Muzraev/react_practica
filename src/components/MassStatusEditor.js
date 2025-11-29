import { useState } from 'react';
import './MassStatusEditor.css';

function MassStatusEditor({ technologies, onUpdateStatuses }) {
  const [selectedStatus, setSelectedStatus] = useState('completed');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  // Выбор/снятие всех технологий
  const toggleAllTechnologies = () => {
    if (selectedTechnologies.length === technologies.length) {
      setSelectedTechnologies([]);
    } else {
      setSelectedTechnologies(technologies.map(tech => tech.id));
    }
  };

  // Выбор/снятие конкретной технологии
  const toggleTechnology = (techId) => {
    setSelectedTechnologies(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    );
  };

  // Применение статуса к выбранным технологиям
  const applyStatus = () => {
    if (selectedTechnologies.length === 0) {
      alert('Выберите технологии для изменения статуса');
      return;
    }

    const updates = selectedTechnologies.map(techId => ({
      techId,
      newStatus: selectedStatus
    }));

    onUpdateStatuses(updates);
    setSelectedTechnologies([]);
  };

  return (
    <div className="mass-status-editor">
      <h3>Массовое изменение статусов</h3>
      
      <div className="editor-controls">
        <div className="status-selector">
          <label htmlFor="mass-status">Установить статус:</label>
          <select
            id="mass-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <button
          onClick={applyStatus}
          disabled={selectedTechnologies.length === 0}
          className="btn-primary"
        >
          Применить к выбранным ({selectedTechnologies.length})
        </button>
      </div>

      <div className="technologies-list">
        <div className="list-header">
          <label className="select-all">
            <input
              type="checkbox"
              checked={selectedTechnologies.length === technologies.length && technologies.length > 0}
              onChange={toggleAllTechnologies}
            />
            Выбрать все
          </label>
          <span className="selected-count">
            Выбрано: {selectedTechnologies.length} из {technologies.length}
          </span>
        </div>

        <div className="technologies-grid">
          {technologies.map(tech => (
            <div key={tech.id} className="technology-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={selectedTechnologies.includes(tech.id)}
                  onChange={() => toggleTechnology(tech.id)}
                />
                <span className="tech-info">
                  <span className="tech-title">{tech.title}</span>
                  <span className={`tech-status status-${tech.status}`}>
                    {tech.status === 'completed' && '✅'}
                    {tech.status === 'in-progress' && '🔄'}
                    {tech.status === 'not-started' && '⏳'}
                  </span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Нет технологий для редактирования</p>
        </div>
      )}
    </div>
  );
}

export default MassStatusEditor;
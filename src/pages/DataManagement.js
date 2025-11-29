import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import MassStatusEditor from '../components/MassStatusEditor';
import DataExporter from '../components/DataExporter';
import DataImporter from '../components/DataImporter';
import './DataManagement.css';

function DataManagement() {
  const { technologies, updateStatus, addTechnology } = useTechnologies();
  const [importedCount, setImportedCount] = useState(0);

  const handleMassStatusUpdate = (updates) => {
    updates.forEach(({ techId, newStatus }) => {
      updateStatus(techId, newStatus);
    });
    alert(`Обновлено статусов: ${updates.length}`);
  };

  const handleImport = (importedTechnologies) => {
    importedTechnologies.forEach(tech => {
      addTechnology({
        title: tech.title,
        description: tech.description,
        category: tech.category || 'frontend',
        status: 'not-started',
        resources: tech.resources || [],
        estimatedHours: tech.estimatedHours || ''
      });
    });
    setImportedCount(prev => prev + importedTechnologies.length);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Назад к трекеру
        </Link>
        <h1>🛠️ Управление данными</h1>
        <p>
          Массовое редактирование статусов, импорт и экспорт данных вашего трекера технологий.
        </p>
      </div>

      <div className="data-management-grid">
        <div className="management-section">
          <MassStatusEditor 
            technologies={technologies}
            onUpdateStatuses={handleMassStatusUpdate}
          />
        </div>

        <div className="management-section">
          <DataExporter technologies={technologies} />
        </div>

        <div className="management-section">
          <DataImporter onImport={handleImport} />
        </div>
      </div>

      <div className="import-stats">
        <h3>Статистика импорта</h3>
        <p>Всего импортировано технологий: <strong>{importedCount}</strong></p>
      </div>
    </div>
  );
}

export default DataManagement;
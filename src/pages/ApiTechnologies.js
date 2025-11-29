import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicTechnologyList from '../components/PublicTechnologyList';
import useTechnologies from '../hooks/useTechnologies';
import './ApiTechnologies.css';

function ApiTechnologies() {
  const { addTechnology } = useTechnologies();
  const [importedCount, setImportedCount] = useState(0);

  const handleImportTechnology = (tech) => {
    const newTech = {
      id: Date.now(),
      title: tech.title,
      description: tech.description,
      category: tech.category,
      status: 'not-started',
      notes: '',
      resources: tech.resources
    };

    addTechnology(newTech);
    setImportedCount(prev => prev + 1);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Назад к трекеру
        </Link>
        <div className="header-content">
          <h1>📚 Публичный каталог технологий</h1>
          <div className="import-stats">
            Импортировано технологий: <strong>{importedCount}</strong>
          </div>
        </div>
        <p>
          Импортируйте технологии из публичного каталога в свой персональный трекер обучения.
          Все технологии включают ссылки на официальные ресурсы для изучения.
        </p>
      </div>

      <PublicTechnologyList onImportTechnology={handleImportTechnology} />
    </div>
  );
}

export default ApiTechnologies;
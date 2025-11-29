import { useState, useEffect } from 'react';

// Моковые данные публичных технологий
const mockPublicTechnologies = [
  {
    id: 1,
    title: 'React',
    description: 'Библиотека для создания пользовательских интерфейсов',
    category: 'frontend',
    difficulty: 'beginner',
    resources: ['https://react.dev', 'https://ru.reactjs.org'],
    tags: ['javascript', 'ui', 'frontend']
  },
  {
    id: 2,
    title: 'Node.js',
    description: 'Среда выполнения JavaScript на сервере',
    category: 'backend', 
    difficulty: 'intermediate',
    resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
    tags: ['javascript', 'server', 'backend']
  },
  {
    id: 3,
    title: 'TypeScript',
    description: 'Типизированное надмножество JavaScript',
    category: 'language',
    difficulty: 'intermediate',
    resources: ['https://www.typescriptlang.org'],
    tags: ['typescript', 'javascript', 'programming']
  },
  {
    id: 4,
    title: 'Docker',
    description: 'Платформа для разработки, доставки и запуска приложений в контейнерах',
    category: 'devops',
    difficulty: 'intermediate',
    resources: ['https://www.docker.com/'],
    tags: ['containers', 'devops', 'deployment']
  },
  {
    id: 5,
    title: 'GraphQL',
    description: 'Язык запросов для API',
    category: 'backend',
    difficulty: 'intermediate',
    resources: ['https://graphql.org/'],
    tags: ['api', 'query', 'backend']
  },
  {
    id: 6,
    title: 'MongoDB',
    description: 'Документоориентированная система управления базами данных',
    category: 'database',
    difficulty: 'intermediate',
    resources: ['https://www.mongodb.com/'],
    tags: ['database', 'nosql', 'backend']
  }
];

function usePublicTechnologies() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Имитация загрузки из API
    const timer = setTimeout(() => {
      try {
        setTechnologies(mockPublicTechnologies);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить технологии');
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const searchTechnologies = (query) => {
    if (!query.trim()) return mockPublicTechnologies;
    
    const lowerQuery = query.toLowerCase();
    return mockPublicTechnologies.filter(tech =>
      tech.title.toLowerCase().includes(lowerQuery) ||
      tech.description.toLowerCase().includes(lowerQuery) ||
      tech.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  return { 
    technologies, 
    loading, 
    error,
    searchTechnologies 
  };
}

export default usePublicTechnologies;
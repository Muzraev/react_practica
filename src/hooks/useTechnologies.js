import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов', 
    status: 'completed',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 2, 
    title: 'JSX Syntax', 
    description: 'Освоение синтаксиса JSX', 
    status: 'in-progress',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 3, 
    title: 'State Management', 
    description: 'Работа с состоянием компонентов', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 4, 
    title: 'Node.js Basics', 
    description: 'Основы серверного JavaScript', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  { 
    id: 5, 
    title: 'REST API', 
    description: 'Создание и использование API', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const addTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      notes: techData.notes || '',
      resources: techData.resources || []
    };
    setTechnologies(prev => [...prev, newTech]);
  };

  const markAllCompleted = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  const getStatsByCategory = () => {
    const categories = {};
    technologies.forEach(tech => {
      if (!categories[tech.category]) {
        categories[tech.category] = { total: 0, completed: 0 };
      }
      categories[tech.category].total++;
      if (tech.status === 'completed') {
        categories[tech.category].completed++;
      }
    });
    return categories;
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    markAllCompleted,
    resetAllStatuses,
    progress: calculateProgress(),
    categoryStats: getStatsByCategory()
  };
}

export default useTechnologies;
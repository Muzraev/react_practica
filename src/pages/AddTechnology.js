import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyForm from '../components/TechnologyForm';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const handleSubmit = (formData) => {
    const newTechnology = {
      ...formData,
      status: 'not-started',
      notes: '',
      createdAt: new Date().toISOString()
    };
    
    addTechnology(newTechnology);
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить новую технологию</h1>
        <p>Заполните форму ниже, чтобы добавить технологию в ваш трекер обучения</p>
      </div>

      <TechnologyForm
        onSave={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddTechnology;
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyForm from '../components/TechnologyForm';

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Заголовок */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/technologies')}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Добавить новую технологию
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Заполните форму ниже, чтобы добавить технологию в ваш трекер обучения
            </Typography>
          </Box>
        </Box>

        {/* Форма */}
        <TechnologyForm
          onSave={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>
    </Container>
  );
}

export default AddTechnology;
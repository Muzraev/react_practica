import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import useTechnologies from '../hooks/useTechnologies';
import MassStatusEditor from '../components/MassStatusEditor';
import DataExporter from '../components/DataExporter';
import DataImporter from '../components/DataImporter';

function DataManagement() {
  const { technologies, updateStatus, addTechnology } = useTechnologies();
  const [importedCount, setImportedCount] = useState(0);

  const handleMassStatusUpdate = (updates) => {
    updates.forEach(({ techId, newStatus }) => {
      updateStatus(techId, newStatus);
    });
    // Можно заменить alert на Snackbar (следующий шаг)
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBack />}
            sx={{ mr: 2 }}
          >
            Назад к трекеру
          </Button>
        </Box>
        
        <Typography variant="h3" component="h1" gutterBottom>
          🛠️ Управление данными
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Массовое редактирование статусов, импорт и экспорт данных вашего трекера технологий
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Массовое редактирование статусов */}
        <Grid item xs={12} lg={6}>
          <Card elevation={2}>
            <CardContent>
              <MassStatusEditor 
                technologies={technologies}
                onUpdateStatuses={handleMassStatusUpdate}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Экспорт данных */}
        <Grid item xs={12} lg={6}>
          <Card elevation={2}>
            <CardContent>
              <DataExporter technologies={technologies} />
            </CardContent>
          </Card>
        </Grid>

        {/* Импорт данных */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <DataImporter onImport={handleImport} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Статистика импорта */}
      <Paper elevation={1} sx={{ p: 3, mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Статистика импорта
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography variant="body1">
            Всего импортировано технологий:
          </Typography>
          <Chip 
            label={importedCount} 
            color="primary" 
            variant="outlined"
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default DataManagement;
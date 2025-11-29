import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  TextField,
  Chip,
  InputAdornment
} from '@mui/material';
import {
  Check,
  Refresh,
  Download,
  Search
} from '@mui/icons-material';
import useTechnologies from '../hooks/useTechnologies';
import SimpleTechCard from '../components/SimpleTechCard';

function Home() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    progress,
    categoryStats
  } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleMarkAllCompleted = () => {
    markAllCompleted();
  };

  const handleResetAll = () => {
    resetAllStatuses();
  };

  const handleStatusChange = (techId, newStatus) => {
    updateStatus(techId, newStatus);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary" align="center">
          Трекер изучения технологий
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" gutterBottom>
          Добро пожаловать в ваш персональный трекер обучения!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Общий прогресс</Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 20, 
              borderRadius: 2,
              backgroundColor: 'grey.200'
            }}
            color="primary"
          />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Прогресс по категориям
              </Typography>
              
              {Object.entries(categoryStats).map(([category, stats]) => {
                const categoryProgress = stats.total > 0 ? 
                  Math.round((stats.completed / stats.total) * 100) : 0;
                
                const categoryLabels = {
                  frontend: 'Фронтенд',
                  backend: 'Бэкенд',
                  database: 'Базы данных',
                  tools: 'Инструменты'
                };

                return (
                  <Box key={category} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {categoryLabels[category] || category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stats.completed}/{stats.total}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={categoryProgress}
                      sx={{ height: 8, borderRadius: 4 }}
                      color={
                        category === 'frontend' ? 'primary' :
                        category === 'backend' ? 'secondary' :
                        category === 'database' ? 'success' : 'warning'
                      }
                    />
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Быстрые действия
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<Check />}
                  onClick={handleMarkAllCompleted}
                  disabled={technologies.length === 0}
                  size="large"
                >
                  Отметить все как выполненные
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleResetAll}
                  disabled={technologies.length === 0}
                  size="large"
                >
                  Сбросить все статусы
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  disabled={technologies.length === 0}
                  size="large"
                >
                  Экспорт данных
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Фильтры
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {[
                  { value: 'all', label: 'Все' },
                  { value: 'completed', label: 'Завершённые' },
                  { value: 'in-progress', label: 'В процессе' },
                  { value: 'not-started', label: 'Не начатые' }
                ].map((filterOption) => (
                  <Chip
                    key={filterOption.value}
                    label={filterOption.label}
                    onClick={() => setFilter(filterOption.value)}
                    color={filter === filterOption.value ? 'primary' : 'default'}
                    variant={filter === filterOption.value ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                placeholder="Поиск технологий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Найдено: {filteredTechnologies.length} технологий
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Мой список технологий для изучения
          </Typography>
          
          <Grid container spacing={3}>
            {filteredTechnologies.map(tech => (
              <Grid item xs={12} sm={6} md={4} key={tech.id}>
                <SimpleTechCard
                  technology={tech}
                  onStatusChange={handleStatusChange}
                />
              </Grid>
            ))}
          </Grid>

          {filteredTechnologies.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center', mt: 2 }}>
              <Typography variant="h6" color="text.secondary">
                {technologies.length === 0 
                  ? 'Технологий пока нет. Добавьте первую технологию!' 
                  : 'Технологии не найдены. Попробуйте изменить фильтры или поисковый запрос.'
                }
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle,
  PlayCircle,
  Schedule,
  Folder
} from '@mui/icons-material';

function Statistics() {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const categoryStats = {};
  technologies.forEach(tech => {
    if (!categoryStats[tech.category]) {
      categoryStats[tech.category] = { total: 0, completed: 0 };
    }
    categoryStats[tech.category].total++;
    if (tech.status === 'completed') {
      categoryStats[tech.category].completed++;
    }
  });

  const categoryLabels = {
    frontend: 'Фронтенд',
    backend: 'Бэкенд',
    database: 'Базы данных',
    tools: 'Инструменты',
    mobile: 'Мобильная разработка',
    devops: 'DevOps'
  };

  const categoryColors = {
    frontend: 'primary',
    backend: 'secondary',
    database: 'success',
    tools: 'warning',
    mobile: 'info',
    devops: 'error'
  };

  const statCards = [
    {
      label: 'Всего технологий',
      value: total,
      icon: <Folder sx={{ fontSize: 40 }} />,
      color: 'primary'
    },
    {
      label: 'Изучено',
      value: completed,
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      color: 'success'
    },
    {
      label: 'В процессе',
      value: inProgress,
      icon: <PlayCircle sx={{ fontSize: 40 }} />,
      color: 'warning'
    },
    {
      label: 'Не начато',
      value: notStarted,
      icon: <Schedule sx={{ fontSize: 40 }} />,
      color: 'info'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Статистика обучения
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Обзор вашего прогресса в изучении технологий
        </Typography>
      </Paper>

      {/* Статистические карточки */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              elevation={2}
              sx={{ 
                textAlign: 'center',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ color: `${stat.color}.main`, mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Общий прогресс */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Общий прогресс
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={progressPercent} 
                sx={{ 
                  height: 20, 
                  borderRadius: 2,
                  backgroundColor: 'grey.200'
                }}
                color="primary"
              />
            </Box>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {progressPercent}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Изучено {completed} из {total} технологий
          </Typography>
        </CardContent>
      </Card>

      {/* Прогресс по категориям */}
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Прогресс по категориям
          </Typography>
          
          {Object.entries(categoryStats).map(([category, stats]) => {
            const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const color = categoryColors[category] || 'primary';
            
            return (
              <Box key={category} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {categoryLabels[category] || category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight="bold">
                    {stats.completed}/{stats.total} ({progress}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress}
                  sx={{ height: 12, borderRadius: 2 }}
                  color={color}
                />
              </Box>
            );
          })}

          {Object.keys(categoryStats).length === 0 && (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
              Нет данных для отображения. Добавьте технологии в трекер.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default Statistics;
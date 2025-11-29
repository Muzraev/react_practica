import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Alert
} from '@mui/material';
import {
  Download,
  Upload,
  Delete,
  Warning
} from '@mui/icons-material';

function Settings() {
  const [importMessage, setImportMessage] = useState('');

  const handleResetData = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
      localStorage.removeItem('technologies');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = localStorage.getItem('technologies');
    if (!data) {
      alert('Нет данных для экспорта');
      return;
    }
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technology-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          localStorage.setItem('technologies', JSON.stringify(data));
          setImportMessage('success');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          setImportMessage('error');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Настройки
        </Typography>

        {/* Управление данными */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Управление данными
          </Typography>

          {/* Экспорт данных */}
          <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Download sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Экспорт данных
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Скачайте резервную копию ваших данных в формате JSON
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExportData}
            >
              Экспортировать данные
            </Button>
          </Box>

          {/* Импорт данных */}
          <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Upload sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Импорт данных
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Восстановите данные из ранее созданной резервной копии
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload />}
            >
              Выбрать файл
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                hidden
              />
            </Button>
          </Box>

          {/* Сообщения об импорте */}
          {importMessage === 'success' && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Данные успешно импортированы! Страница будет перезагружена...
            </Alert>
          )}
          {importMessage === 'error' && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Ошибка при импорте данных: неверный формат файла
            </Alert>
          )}
        </Box>

        {/* Сброс данных */}
        <Box>
          <Typography variant="h5" gutterBottom color="error">
            Опасная зона
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Внимание! Эти действия нельзя отменить
            </Typography>
          </Alert>
          
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Warning sx={{ color: 'error.main', mr: 2 }} />
              <Typography variant="h6" color="error">
                Сброс всех данных
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Удалите все данные и начните заново. Все ваши технологии и прогресс будут удалены.
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={handleResetData}
            >
              Сбросить все данные
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Settings;
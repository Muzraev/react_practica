import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function Navigation({ isDarkMode, onToggleTheme }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Функция для проверки активного пути
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        {/* Бренд/логотип */}
        <Typography 
          variant="h6" 
          component={Link}
          to="/"
          sx={{ 
            flexGrow: isMobile ? 1 : 0,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            mr: 4
          }}
        >
          Трекер технологий
        </Typography>

        {/* Навигационное меню */}
        <Box sx={{ 
          display: 'flex', 
          flexGrow: 1,
          gap: 1,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          justifyContent: isMobile ? 'center' : 'flex-start'
        }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            variant={isActive('/') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
          >
            Главная
          </Button>
          
          <Button
            color="inherit"
            component={Link}
            to="/technologies"
            variant={isActive('/technologies') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
          >
            Все технологии
          </Button>
          
          <Button
            color="inherit"
            component={Link}
            to="/api-technologies"
            variant={isActive('/api-technologies') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
          >
            Публичные технологии
          </Button>
          
          <Button
            color="inherit"
            component={Link}
            to="/add-technology"
            variant={isActive('/add-technology') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
          >
            Добавить
          </Button>
          
          <Button
            color="inherit"
            component={Link}
            to="/data-management"
            variant={isActive('/data-management') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
          >
            Данные
          </Button>
          
          <Button
            color="inherit"
            component={Link}
            to="/statistics"
            variant={isActive('/statistics') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
          >
            Статистика
          </Button>
        </Box>

        {/* Переключатель темы и настройки */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          ml: 2
        }}>
          {/* Переключатель темы */}
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={onToggleTheme}
                icon={<Brightness7 sx={{ color: 'white' }} />}
                checkedIcon={<Brightness4 />}
                size="small"
              />
            }
            label={isDarkMode ? 'Тёмная' : 'Светлая'}
            sx={{ 
              color: 'white',
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                display: isMobile ? 'none' : 'block'
              }
            }}
          />

          {/* Кнопка настроек */}
          <Button
            color="inherit"
            component={Link}
            to="/settings"
            variant={isActive('/settings') ? "outlined" : "text"}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              minWidth: 'auto',
              display: isMobile ? 'none' : 'block'
            }}
          >
            Настройки
          </Button>

          {/* Иконка настроек для мобильных */}
          <Button
            color="inherit"
            component={Link}
            to="/settings"
            variant={isActive('/settings') ? "outlined" : "text"}
            size="small"
            sx={{ 
              minWidth: 'auto',
              display: isMobile ? 'block' : 'none'
            }}
          >
            ⚙️
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
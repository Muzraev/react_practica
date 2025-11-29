import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';
import { theme, darkTheme } from './styles/theme';
import { Grid } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import ApiTechnologies from './pages/ApiTechnologies';
import DataManagement from './pages/DataManagement';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Используем useMemo чтобы тема не пересоздавалась при каждом рендере
  const currentTheme = useMemo(() => {
    return isDarkMode ? darkTheme : theme;
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navigation isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/api-technologies" element={<ApiTechnologies />} />
            <Route path="/data-management" element={<DataManagement />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
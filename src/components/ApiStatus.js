import useApi from '../hooks/useApi';
import './ApiStatus.css';

function ApiStatus() {
  // Пример использования useApi с реальным API
  const { data, loading, error } = useApi('https://api.github.com/users/github');

  return (
    <div className="api-status">
      <h3>Статус API</h3>
      <div className="status-items">
        <div className="status-item">
          <span className="status-label">GitHub API:</span>
          {loading && <span className="status loading">Проверка...</span>}
          {error && <span className="status error">Ошибка</span>}
          {data && <span className="status success">Работает</span>}
        </div>
      </div>
    </div>
  );
}

export default ApiStatus;
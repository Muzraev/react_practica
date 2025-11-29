import './Settings.css';

function Settings() {
  const handleResetData = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
      localStorage.removeItem('technologies');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = localStorage.getItem('technologies');
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
          alert('Данные успешно импортированы!');
          window.location.reload();
        } catch (error) {
          alert('Ошибка при импорте данных: неверный формат файла.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Настройки</h1>
      </div>

      <div className="settings-section">
        <h2>Управление данными</h2>
        
        <div className="setting-item">
          <h3>Экспорт данных</h3>
          <p>Скачайте резервную копию ваших данных в формате JSON.</p>
          <button onClick={handleExportData} className="btn btn-primary">
            Экспортировать данные
          </button>
        </div>

        <div className="setting-item">
          <h3>Импорт данных</h3>
          <p>Восстановите данные из ранее созданной резервной копии.</p>
          <input
            type="file"
            accept=".json"
            onChange={handleImportData}
            className="file-input"
          />
        </div>

        <div className="setting-item">
          <h3>Сброс данных</h3>
          <p>Удалите все данные и начните заново. Это действие нельзя отменить.</p>
          <button onClick={handleResetData} className="btn btn-danger">
            Сбросить все данные
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
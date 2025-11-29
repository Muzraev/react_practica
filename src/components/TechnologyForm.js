import { useState, useEffect, useRef } from 'react';
import './TechnologyForm.css';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources || [''],
    estimatedHours: initialData.estimatedHours || ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({});
  const firstErrorRef = useRef(null);

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация названия
    if (!formData.title.trim()) {
      newErrors.title = 'Название технологии обязательно';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Название должно содержать минимум 2 символа';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Название не должно превышать 50 символов';
    }

    // Валидация описания
    if (!formData.description.trim()) {
      newErrors.description = 'Описание технологии обязательно';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов';
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Описание не должно превышать 500 символов';
    }

    // Валидация дедлайна
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    // Валидация часов
    if (formData.estimatedHours) {
      const hours = parseInt(formData.estimatedHours);
      if (isNaN(hours) || hours < 1) {
        newErrors.estimatedHours = 'Укажите корректное количество часов (минимум 1)';
      } else if (hours > 1000) {
        newErrors.estimatedHours = 'Слишком большое количество часов (максимум 1000)';
      }
    }

    // Валидация ресурсов
    formData.resources.forEach((resource, index) => {
      if (resource && !isValidUrl(resource)) {
        newErrors[`resource_${index}`] = 'Введите корректный URL';
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Проверка URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Валидация при каждом изменении формы
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Фокусировка на первой ошибке
  useEffect(() => {
    if (firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Обработчик изменения ресурсов
  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }));
  };

  // Добавление нового поля ресурса
  const addResourceField = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  // Удаление поля ресурса
  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Помечаем все поля как "тронутые" для показа ошибок
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (isFormValid) {
      // Очищаем пустые ресурсы перед сохранением
      const cleanedData = {
        ...formData,
        resources: formData.resources.filter(resource => resource.trim() !== ''),
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null
      };
      
      onSave(cleanedData);
    } else {
      // Находим первое поле с ошибкой для фокусировки
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.focus();
        }
      }
    }
  };

  // Получаем класс для поля
  const getFieldClassName = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return 'error';
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return 'success';
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit} className="technology-form" noValidate>
      <h2>{initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}</h2>

      {/* Поле названия */}
      <div className="form-group">
        <label htmlFor="title" className="required">
          Название технологии
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={getFieldClassName('title')}
          placeholder="Например: React, Node.js, TypeScript"
          aria-describedby={errors.title ? 'title-error' : 'title-help'}
          aria-invalid={!!errors.title}
          aria-required="true"
          ref={errors.title ? firstErrorRef : null}
        />
        {errors.title ? (
          <span id="title-error" className="error-message" role="alert">
            {errors.title}
          </span>
        ) : (
          <span id="title-help" className="help-text">
            Минимум 2 символа, максимум 50
          </span>
        )}
      </div>

      {/* Поле описания */}
      <div className="form-group">
        <label htmlFor="description" className="required">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={getFieldClassName('description')}
          placeholder="Опишите, что это за технология и зачем её изучать..."
          aria-describedby={errors.description ? 'description-error' : 'description-help'}
          aria-invalid={!!errors.description}
          aria-required="true"
        />
        {errors.description ? (
          <span id="description-error" className="error-message" role="alert">
            {errors.description}
          </span>
        ) : (
          <span id="description-help" className="help-text">
            Минимум 10 символов, максимум 500
          </span>
        )}
      </div>

      <div className="form-row">
        {/* Выбор категории */}
        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="mobile">Mobile</option>
            <option value="devops">DevOps</option>
            <option value="database">Базы данных</option>
            <option value="tools">Инструменты</option>
          </select>
        </div>

        {/* Выбор сложности */}
        <div className="form-group">
          <label htmlFor="difficulty">Уровень сложности</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="beginner">Начинающий</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        {/* Поле дедлайна */}
        <div className="form-group">
          <label htmlFor="deadline">
            Планируемая дата освоения
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            className={getFieldClassName('deadline')}
            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
            aria-invalid={!!errors.deadline}
          />
          {errors.deadline && (
            <span id="deadline-error" className="error-message" role="alert">
              {errors.deadline}
            </span>
          )}
        </div>

        {/* Поле часов */}
        <div className="form-group">
          <label htmlFor="estimatedHours">
            Оценочное время изучения (часов)
          </label>
          <input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            min="1"
            max="1000"
            value={formData.estimatedHours}
            onChange={handleChange}
            className={getFieldClassName('estimatedHours')}
            placeholder="Например: 40"
            aria-describedby={errors.estimatedHours ? 'hours-error' : 'hours-help'}
            aria-invalid={!!errors.estimatedHours}
          />
          {errors.estimatedHours ? (
            <span id="hours-error" className="error-message" role="alert">
              {errors.estimatedHours}
            </span>
          ) : (
            <span id="hours-help" className="help-text">
              От 1 до 1000 часов
            </span>
          )}
        </div>
      </div>

      {/* Поля ресурсов */}
      <div className="form-group">
        <label>Ресурсы для изучения</label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-field">
            <input
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="https://example.com"
              className={errors[`resource_${index}`] ? 'error' : ''}
              aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
              aria-invalid={!!errors[`resource_${index}`]}
            />
            {formData.resources.length > 1 && (
              <button
                type="button"
                onClick={() => removeResourceField(index)}
                className="remove-resource"
                aria-label={`Удалить ресурс ${index + 1}`}
              >
                ×
              </button>
            )}
            {errors[`resource_${index}`] && (
              <span 
                id={`resource-${index}-error`} 
                className="error-message" 
                role="alert"
              >
                {errors[`resource_${index}`]}
              </span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addResourceField}
          className="add-resource"
        >
          + Добавить ещё ресурс
        </button>
      </div>

      {/* Кнопки формы */}
      <div className="form-actions">
        <button
          type="submit"
          disabled={!isFormValid}
          className="btn-primary"
          aria-describedby={!isFormValid ? 'form-validation-info' : undefined}
        >
          {initialData.title ? 'Обновить технологию' : 'Добавить технологию'}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Отмена
        </button>
      </div>

      {/* Информация о валидности формы */}
      {!isFormValid && Object.keys(touched).length > 0 && (
        <div id="form-validation-info" className="form-validation-info" role="alert">
          ⚠️ Заполните все обязательные поля корректно
        </div>
      )}
    </form>
  );
}

export default TechnologyForm;
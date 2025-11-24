import React from 'react';
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomPick }) {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button onClick={onMarkAllCompleted} className="action-btn complete-all">
                    ✅ Отметить все как выполненные
                </button>
                <button onClick={onResetAll} className="action-btn reset-all">
                    🔄 Сбросить все статусы
                </button>
                <button onClick={onRandomPick} className="action-btn random-pick">
                    🎲 Случайный выбор
                </button>
            </div>
        </div>
    );
}

export default QuickActions;
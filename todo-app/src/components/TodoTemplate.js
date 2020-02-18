import React from 'react';
import './TodoTemplate.scss';

// <TodoTemplate></TodoTemplate> 사이의 있는 것들을 childen으로 받아온다.
const TodoTemplate = ({ children }) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default TodoTemplate;

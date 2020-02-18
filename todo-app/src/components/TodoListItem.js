import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
    const { id, text, checked } = todo;
    return (
        <div className="TodoListItem">
            <div
                className={cn('checkbox', { checked })}
                onClick={() => onToggle(id)}
            >
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{text}</div>
            </div>
            <div
                className="remove"
                onClick={() => {
                    onRemove(id);
                }}
            >
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};
// < 리렌더링 성능 최적화 방법 >
// React.memo : 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화 해 줄 수 있다.
// 즉, TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않는다.
export default React.memo(TodoListItem);

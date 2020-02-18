import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '리액트의 기초 알아보기',
            checked: true,
        },
        {
            id: 2,
            text: '컴포넌트 스타일링 해보기',
            checked: true,
        },
        {
            id: 3,
            text: '일정 관리 앱 만들어 보기',
            checked: false,
        },
    ]);

    const nextId = useRef(4);

    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };

            setTodos(todos.concat(todo));
            nextId.current += 1; // nextId 1씩 더하기
        },
        [todos],
    );

    const onRemove = useCallback(
        id => {
            // filter : 기존의 배열은 그대로 둔 상태에서 특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어 주는 함수
            // 즉, 삭제를 클릭한 todo의 id가 아닌것들만 모아서 새로운 배열을 만듬
            setTodos(todos.filter(todo => todo.id !== id));
        },
        [todos],
    );

    const onToggle = useCallback(
        id => {
            setTodos(
                // map 함수는 배열을 전체적으로 새로운 형태로 변환하여 새로운 배열을 생성해야 할 때 사용하는 함수
                // 여기서는 map을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아있게 된다.
                todos.map(todo =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo,
                ),
            );
        },
        [todos],
    );

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default App;

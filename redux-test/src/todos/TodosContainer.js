import React from 'react';
import TodosPresenter from './TodosPresenter';
import { useSelector, useDispatch } from 'react-redux';
import { changeIn, insert, remove, toggle } from '../reducer/modules/todos';

const TodosContainer = () => {
   const input = useSelector(state => state.todos.input);
   const todos = useSelector(state => state.todos.todos);
   const dispatch = useDispatch();
   return (
      <TodosPresenter
         input={input}
         todos={todos}
         onChangeIn={input => dispatch(changeIn(input))}
         onInsert={text => dispatch(insert(text))}
         onToggle={id => dispatch(toggle(id))}
         onRemove={id => dispatch(remove(id))}
      />
   );
};

export default TodosContainer;

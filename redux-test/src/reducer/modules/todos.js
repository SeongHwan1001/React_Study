const CHANGE_IN = 'CHANG_IN';
const INSERT = 'INSERT';
const TOGGLE = 'TOGGLE';
const REMOVE = 'REMOVE';

export const changeIn = input => ({ type: CHANGE_IN, input });
let id = 4;
export const insert = text => ({
   type: INSERT,
   todo: {
      id: id++,
      text,
      done: false,
   },
});
export const toggle = id => ({ type: TOGGLE, id });
export const remove = id => ({ type: REMOVE, id });

const initialState = {
   input: '',
   todos: [
      {
         id: 1,
         text: '리액트',
         done: true,
      },
      {
         id: 2,
         text: '리덕스',
         done: false,
      },
      {
         id: 3,
         text: '실습',
         done: false,
      },
   ],
};

function todos(state = initialState, action) {
   switch (action.type) {
      case CHANGE_IN:
         return {
            ...state,
            input: action.input,
         };
      case INSERT:
         return {
            ...state,
            todos: state.todos.concat(action.todo),
         };
      case TOGGLE:
         return {
            ...state,
            todos: state.todos.map(todo =>
               todo.id === action.id ? { ...todo, done: !todo.done } : todo,
            ),
         };
      case REMOVE:
         return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.id),
         };
      default:
         return state;
   }
}

export default todos;

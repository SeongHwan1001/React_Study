import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "todos/CHANGE_INPUT"; // 인풋 값을 변경함
const INSERT = "todos/INSERT"; // 새로운 todo를 등록함
const TOGGLE = "todos/TOGGLE"; // todo를 체크 or 체크 해제
const REMOVE = "todos/REMOVE"; // todo를 제거함

// export const changeInput = input => ({
//   type: CHANGE_INPUT,
//   input
// });

export const changeInput = createAction(CHANGE_INPUT, input => input);

let id = 3; // insert가 호출 될 때마다 1씩 더해진다.

// export const insert = text => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false
//   }
// });

export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false
}));

// export const toggle = id => ({
//   type: TOGGLE,
//   id
// });

// export const remove = id => ({
//   type: REMOVE,
//   id
// });

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리액트",
      done: true
    },
    {
      id: 2,
      text: "리덕스",
      done: true
    },
    {
      id: 3,
      text: "리덕스 어렵다",
      done: false
    }
  ]
};

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo)
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         )
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.id)
//       };
//     default:
//       return state;
//   }
// }

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo)
    }),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id)
    })
  },
  initialState
);

export default todos;

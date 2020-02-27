import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액셩 생성 함수 선언 할 수 있다는 장점
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0
};

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1
//       };
//     default:
//       return state;
//   }
// }

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 })
  },
  initialState
);

export default counter;

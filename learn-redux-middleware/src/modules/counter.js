import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const INCREASE = "conunter/INCREASE";
const DECREASE = "conunter/DECREASE";

// 액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = 0; // 초기 상태는 꼭 객체일 필요 없이 숫자도 가능하다.

// 리듀서 함수
const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
  },
  initialState
);

export default counter;

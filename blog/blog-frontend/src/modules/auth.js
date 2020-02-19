import { createAction, handleActions } from 'redux-actions';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

// createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언 할 수 있다.
export const sampleAction = createAction(SAMPLE_ACTION);

const initialState = {};

const auth = handleActions(
   {
      [SAMPLE_ACTION]: (state, action) => state,
   },
   initialState,
);

export default auth;

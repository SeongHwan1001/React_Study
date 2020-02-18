// counter 모듈
// Ducks 패턴을 사용하여 액션타입, 액션생성함수, 리듀서를 작성한 코드를 '모듈'이라 한다.

// 액션 타입 정의하기
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성함수 만들기
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기상태
const initialState = {
   number: 0,
};

// 리듀서 함수 <reducer 이름 대신 counter 이름을 사용>
function counter(state = initialState, action) {
   switch (action.type) {
      case INCREASE:
         return {
            number: state.number + 1,
         };
      case DECREASE:
         return {
            number: state.number - 1,
         };
      default:
         return state;
   }
}

export default counter;

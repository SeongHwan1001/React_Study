const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_INPUT = 'CHANGE_INPUT';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const changeInput = input => ({ type: CHANGE_INPUT, input });

const initialState = {
   number: 0,
};

function counter(state = initialState, action) {
   console.log(action.input);
   switch (action.type) {
      case INCREASE:
         return {
            number: Number(state.number) + 1,
         };
      case DECREASE:
         return {
            number: Number(state.number) - 1,
         };
      case CHANGE_INPUT:
         return {
            ...state,
            number: action.input,
         };
      default:
         return state;
   }
}

export default counter;

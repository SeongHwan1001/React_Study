import React from 'react';
// import { connect } from 'react-redux';
import CounterPresenter from './CounterPresenter';

import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from '../reducer/modules/counter';

// 이전 connect를 사용했을 때는 map... 으로 index에 연결되어 값들을 받아 왔지만
// 지금은 바로 store에 접근하는 hook을 사용함으로써 편하게 사용가능
// const CounterContainer = ({ number, increase, decrease }) => {
const CounterContainer = () => {
   const number = useSelector(state => state.counter.number);
   const dispatch = useDispatch();
   return (
      <CounterPresenter
         number={number}
         onIncrease={() => dispatch(increase())}
         onDecrease={() => dispatch(decrease())}
         // onIncrease={increase}
         // onDecrease={decrease}
      />
   );
};

export default CounterContainer;

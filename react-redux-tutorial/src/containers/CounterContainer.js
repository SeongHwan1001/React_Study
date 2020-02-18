// 리덕스 스토어에 접근하여 원하는 상태를 받아오고, 또 액션도 디스패치 해준다.
// 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컨포넌트라고 한다.

import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
   return (
      <Counter number={number} onIncrease={increase} onDecrease={decrease} />
   );
};

// // 리덕스 스토어 안의 상태를 컴포넌트의 props로 념겨주기 위해 설정하는 함수
// const mapStateToProps = state => ({
//    number: state.counter.number,
// });

// // 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
// const mapDispatchToProps = dispatch => ({
//    // 임시 함수
//    increase: () => {
//       dispatch(increase());
//    },
//    decrease: () => {
//       dispatch(decrease());
//    },
// });

// connect 함수를 사용할 때는 일반적으로 위 코드와 같이 사용한다.
// 하지만 connect 함수 내부에 익명 함수 형태로 선언해도 문제가 되지 않는다. 코드가 더 깔끔하다.

export default connect(
   state => ({
      number: state.counter.number,
   }),
   dispatch => ({
      increase: () => dispatch(increase()),
      decrease: () => dispatch(decrease()),
   }),
)(CounterContainer);

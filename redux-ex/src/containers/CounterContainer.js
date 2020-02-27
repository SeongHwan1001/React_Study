import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";

// import { bindActionCreators } from "redux";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정
// 스토어에서 state를 가져온다라고 생각
// const mapStateToProps = state => ({
//   number: state.counter.number
// });

// 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
// const mapDispatchToProps = dispatch => ({
//   increase: () => {
//     dispatch(increase());
//   },
//   decrease: () => {
//     dispatch(decrease());
//   }
// });

export default connect(
  state => ({
    number: state.counter.number
  }),
  // 이렇게 객체 형태로 넣으면 connect 함수가 내부적으로 bindActionCreators 작업 대신 해줌
  {
    increase,
    decrease
  }
  //   dispatch =>
  //   // 2번
  //     // 아래와 같이 dispatch로 감싸는 작업이 함수의 갯수가 많아 진다면 번거로움
  //     // redux에서 제공하는 유틸 함수를 사용하면 간편
  //     bindActionCreators(
  //       {
  //         increase,
  //         decrease
  //       },
  //       dispatch
  //     )
  // 1번
  //   dispatch => ({
  //     increase: () => dispatch(increase()),
  //     decrease: () => dispatch(decrease())
  //   })
)(CounterContainer);

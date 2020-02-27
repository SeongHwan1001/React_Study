import React from 'react';
import ChangePresenter from './ChangePresenter';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput } from '../reducer/modules/counter';

const ChangeContainer = () => {
   const number = useSelector(state => state.counter.number);
   const dispatch = useDispatch();
   return (
      <ChangePresenter
         number={number}
         onChangeInput={input => dispatch(changeInput(input))}
      />
   );
};

export default ChangeContainer;

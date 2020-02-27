import React from 'react';

const ChangePresenter = ({ number, onChangeInput }) => {
   const onChange = e => onChangeInput(e.target.value);
   return (
      <div>
         <input type="number" value={number} onChange={onChange} />
      </div>
   );
};

export default ChangePresenter;

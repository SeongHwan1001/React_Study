import React from 'react';
import Counter from './counter';
import Change from './change';
import Todos from './todos';

const App = () => {
   return (
      <div>
         <Counter />
         <hr />
         <Change />
         <hr />
         <Todos />
      </div>
   );
};

export default App;

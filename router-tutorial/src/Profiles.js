import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
   const activeStyle = {
      background: 'black',
      color: 'white',
   };
   return (
      <div>
         <h3>사용자 목록:</h3>
         <ul>
            <li>
               {/* activeStyle : 링크가 선택되었을 때 스타일 적용 해서 표시하는 기능을 해준다. */}
               <NavLink activeStyle={activeStyle} to="/profiles/velopert">
                  velopert
               </NavLink>
            </li>
            <li>
               <NavLink activeStyle={activeStyle} to="/profiles/gildong">
                  gildong
               </NavLink>
            </li>
         </ul>
         <Route
            path="/profiles"
            exact
            render={() => <div>사용자를 선택해 주세요.</div>}
         />
         <Route path="/profiles/:username" component={Profile} />
      </div>
   );
};

export default Profiles;

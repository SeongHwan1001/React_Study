import React from 'react';
import { Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import PostListPage from './pages/PostListPage';

const App = () => {
   return (
      <>
         {/* 배열을 넣어 주면 한 라우트 컴포넌트에 여러 개의 경로를 쉽게 설정 할 수 있다. */}
         <Route component={PostListPage} path={['/@:username', '/']} exact />
         <Route component={LoginPage} path="/login" />
         <Route component={RegisterPage} path="/register" />
         <Route component={WritePage} path="/write" />
         <Route component={PostPage} path="/@:username/:postId" />
      </>
   );
};

export default App;

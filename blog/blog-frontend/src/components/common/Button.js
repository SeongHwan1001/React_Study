import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
   border: none;
   border-radius: 4px;
   font-size: 1rem;
   fron-weight: bold;
   padding: 0.25rem 1rem;
   color: white;
   outline: none;
   cursor: pointer;

   backgrounf: ${palette.gray[8]};
   &:hover {
      background: ${palette.gray[6]};
   }
`;

// 굳이 Button 리액트 컴포넌트를 만들어서 그 안에 StyledButton을 렌더링 해 준 이유는?
//  - 이 컴포넌트를 사용할 때 자동 import 하기 위해서
//  - styled-components로 만든 컴포넌트를 바로 내보내면 import가 제대로 작동하지 않는다.
// Button이 받아오는 모든 Props는 StyledButton에 전달한다는 의미
const Button = props => <StyledButton {...props} />;

export default Button;

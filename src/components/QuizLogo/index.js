import styled from 'styled-components';
import React from 'react';

const Logo = styled.div`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;
const LogoImg = styled.img`
  width: 150px;
  margin: -15px 0;
`;

function QuizLogo() {
  return (
    <Logo>
      <LogoImg src="logo_quiz.png" />
    </Logo>
  );
}

export default QuizLogo;

import styled from 'styled-components';
import React from 'react';

const Logo = styled.div`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

function QuizLogo() {
  return <Logo>Quiz Bíblico</Logo>;
}

export default QuizLogo;

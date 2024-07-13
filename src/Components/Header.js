// Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 320px;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #EEEEF0;
  border-radius: 50%;
  margin-right: 10px; 
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold; /* 글씨 굵게 */
  margin: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Circle />
      <Title>momoka</Title>
    </HeaderContainer>
  );
};

export default Header;

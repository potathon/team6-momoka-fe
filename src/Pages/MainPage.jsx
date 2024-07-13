// App.js
import React from "react";
import styled from "styled-components";
import Header from "../Components/Header.js";
import SearchBar from "../Components/Search.js";
import List from "../Components/List.js";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <SearchBar />
      <List />
    </MainContainer>
  );
};

export default MainPage;

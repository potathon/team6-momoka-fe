import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header.js";
import SearchBar from "../Components/Search.js";
import List from "../Components/List.js";
import MapContainer from "../Components/Map.js";
import NoResults from "../Components/NoResults.js";

const MainPage = () => {
  const [hasResults, setHasResults] = useState(true);

  return (
    <MainContainer>
      <Header />
      <SearchBar />
      <MapContainer />
      <List setHasResults={setHasResults} />
      {!hasResults && <NoResults />}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
`;

export default MainPage;

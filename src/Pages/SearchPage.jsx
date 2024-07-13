import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Header from "../Components/Header.js";
import SearchBar from "../Components/Search.js";
import List from "../Components/List.js";
import MapContainer from "../Components/Map.js";
import NoResults from "../Components/NoResults.js";
import { useResultStore } from "../store/useResultStore";

const MainPage = () => {
  const { items } = useResultStore();

  return (
    <MainContainer>
      <Header />
      <SearchBar />
      {items.length ? (
        <>
          <MapContainer />
        </>
      ) : (
        <NoResults />
      )}
      <List />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MainPage;

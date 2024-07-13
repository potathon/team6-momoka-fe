// SearchBar.js
import React from "react";
import styled from "styled-components";
import magnifyingGlass from "../Uploads/돋보기.png"; // 이미지 경로

const SearchContainer = styled.div`
  width: 336px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: white;
  position: relative;
`;

const SearchInput = styled.input`
  height: 38px;
  width: 288px;
  border: 2px solid #ffa34e;
  border-radius: 50px;
  font-size: 14px;
  margin-left: 16px;
  margin-right: 16px;
  padding-left: 16px;
  padding-right: 40px; /* 이미지와 텍스트 간격 확보 */

  &::placeholder {
    font-weight: 300; /* 글씨 얇게 */
  }

  &:focus {
    outline: none;
    border-color: #ffa34e;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 26px;
  background: url(${magnifyingGlass}) no-repeat center center;
  background-size: contain;
  width: 22px;
  height: 22px;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const handleSearch = () => {
    alert("Searching..."); // 검색 동작 (나중에 원하는 동작으로 대체)
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Enter your search here..."
        onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={handleSearch} />
    </SearchContainer>
  );
};

export default SearchBar;

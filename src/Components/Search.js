import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import magnifyingGlass from "../Uploads/magnifying.png"; // 이미지 경로

const getKeywordFromURL = (search) => {
  const params = new URLSearchParams(search);
  return params.get("keyword") || "";
};

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState(getKeywordFromURL(location.search));

  useEffect(() => {
    setKeyword(getKeywordFromURL(location.search));
  }, [location.search]);

  const handleSearch = () => {
    if (keyword.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    const url = `/search?keyword=${encodeURIComponent(keyword)}`;
    navigate(url);
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
        placeholder="검색어를 입력해주세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={handleSearch} />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  max-width: 430px; /* 너비를 304px로 설정 */
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: white;
  position: relative;
`;

const SearchInput = styled.input`
  height: 38px;
  max-width: 430px;
  width: 100%;
  border: 2px solid #ffa34e;
  border-radius: 50px;
  font-size: 14px;
  margin: 0 10px;
  padding: 0 40px 0 16px;

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
  right: 32px; /* 위치를 조정 */
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

export default SearchBar;

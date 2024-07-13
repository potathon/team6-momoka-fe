import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jejudog2 from '../Uploads/jejudog2.png'; // 이미지 경로를 올바르게 설정

const NoResults = () => {
  const navigate = useNavigate();

  const handleSuggestionClick = (keyword) => {
    const url = `/search?keyword=${encodeURIComponent(keyword)}`;
    navigate(url);
  };

  return (
    <NoResultsContainer>
      <Suggestions>
        <Message>검색 결과가 없습니다.</Message>
        <Message>검색 조건을 변경해보세요!!</Message>
        <Message>추천 검색어 바로가기</Message>
        <SuggestionList>
          <SuggestionItem onClick={() => handleSuggestionClick("흑돼지")}>
            흑돼지
          </SuggestionItem>
          <SuggestionItem onClick={() => handleSuggestionClick("몸국")}>
            몸국
          </SuggestionItem>
          <SuggestionItem onClick={() => handleSuggestionClick("갈치조림")}>
            갈치조림
          </SuggestionItem>
        </SuggestionList>
      </Suggestions>
      <ImageContainer>
        <StyledImage src={jejudog2} alt="Jeju Dog" />
      </ImageContainer>
    </NoResultsContainer>
  );
};

const NoResultsContainer = styled.div`
  width: 320px;
  display: flex;
  padding: 30px 0px;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Message = styled.h2`
  color: #555;
  margin: 16px 0; /* 세로 간격을 늘리기 위해 변경 */
  text-align: center;
`;

const Suggestions = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  text-align: center;
`;

const SuggestionList = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

const SuggestionItem = styled.li`
  margin: 0 8px;
  color: #ffa34e;
  cursor: pointer;
  font-size: 1em;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #cc822b;
    text-decoration: underline;
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 150px;
  height: auto;
`;

export default NoResults;

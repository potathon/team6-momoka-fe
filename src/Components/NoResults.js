import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NoResults = () => {
  const navigate = useNavigate();

  const handleSuggestionClick = (keyword) => {
    const url = `/search?keyword=${encodeURIComponent(keyword)}`;
    navigate(url);
  };

  return (
    <NoResultsContainer>
      <Message>검색 결과가 없습니다.</Message>
      <Suggestions>
        <SuggestionItem onClick={() => handleSuggestionClick("돼지고기")}>
          인기 검색어: 돼지고기
        </SuggestionItem>
        <SuggestionItem onClick={() => handleSuggestionClick("고기국수")}>
          인기 검색어: 고기국수
        </SuggestionItem>
        <Message>검색 조건을 변경해보세요!!</Message>
      </Suggestions>
    </NoResultsContainer>
  );
};

const NoResultsContainer = styled.div`
  width: 320px;
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Message = styled.h2`
  color: #333;
`;

const Suggestions = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SuggestionItem = styled.li`
  margin: 10px 0;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default NoResults;

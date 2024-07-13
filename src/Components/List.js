// List.js
import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useResultStore } from "../store/useResultStore";

const List = () => {
  const { items, setItems } = useResultStore();
  const location = useLocation();
  const [keyword, setKeyword] = useState(
    new URLSearchParams(location.search).get("keyword")
  );

  const changeKeyword = useCallback(() => {
    setKeyword(new URLSearchParams(location.search).get("keyword"));
  }, [location.search]);

  useEffect(() => {
    changeKeyword();
  }, [location, changeKeyword]);

  useEffect(() => {
    keyword
      ? fetch(`http://localhost:4000/api/restaurant/search?keyword=${keyword}`)
          .then((response) => response.json())
          .then((data) => {
            setItems(data);
          })
      : fetch("http://localhost:4000/api/restaurant")
          .then((response) => response.json())
          .then((data) => {
            setItems(data);
          });
  }, [keyword, setItems]);

  return (
    <ListContainer>
      {items?.map((item, index) => (
        <ListItem key={index}>
          <Title>{item.name}</Title>
          <Location>{item.addr}</Location>
          <Tell>{item.tel}</Tell>
          <OperatingHours>{item.info}</OperatingHours>
          <MenuList>
            <MenuItem>{item.menu}</MenuItem>
          </MenuList>
        </ListItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 320px; /* 너비를 320px로 설정 */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.div`
  padding: 10px;
  width: 280px; /* 너비를 280px로 설정 */
  border: 1px solid #d9d9de;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
  border-radius: 16px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0 10px 0;
`;

const Location = styled.p`
  font-size: 14px;
  color: grey;
  margin: 0 0 10px 0;
`;

const Tell = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
`;

const OperatingHours = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  color: grey;
  margin: 0 0 15px 0;
`;

const MenuItem = styled.li`
  font-size: 14px;
`;

export default List;

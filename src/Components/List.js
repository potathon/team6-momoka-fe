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

  const changeAddress = (address) => {
    const cleanedAddress = address.replace("제주특별자치도 ", "");
    return cleanedAddress;
  };

  const changePrice = (price) => {
    let cleanedPrice = price.replace(/0 /g, "0원 ");
    cleanedPrice = price.replace(/0$/g, "0원");

    return cleanedPrice;
  };

  const clickItem = (item) => {
    window.open(
      `https://map.kakao.com/link/search/제주 ${item.name}`,
      "_blank"
    );
  };

  const changeKeyword = useCallback(() => {
    setKeyword(new URLSearchParams(location.search).get("keyword"));
  }, [location.search]);

  useEffect(() => {
    changeKeyword();
  }, [location, changeKeyword]);

  useEffect(() => {
    if (keyword) {
      fetch(
        `http://ec2-52-79-127-33.ap-northeast-2.compute.amazonaws.com/api/restaurant/search?keyword=${keyword}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        });
    } else {
      fetch(
        "http://ec2-52-79-127-33.ap-northeast-2.compute.amazonaws.com/api/restaurant"
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        });
    }
  }, [keyword, setItems]);

  return (
    <ListContainer>
      {items?.map((item, index) => (
        <ListItem key={index} onClick={() => clickItem(item)}>
          <Title>{item.name}</Title>
          <Location>{changeAddress(item.addr)}</Location>
          <Info>운영시간 : {item.info}</Info>
          <Tel>{item.tel}</Tel>
          <MenuItem>{changePrice(item.menu)}</MenuItem>
        </ListItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 320px; /* 너비를 320px로 설정 */
  height: calc(100% - 50px);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  width: 280px; /* 너비를 280px로 설정 */
  border: 1px solid #d9d9de;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  margin: 0 0 5px 0;
`;

const Tel = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
  color: grey;
`;

const Info = styled.p`
  font-size: 14px;
  margin: 0 0 10px 0;
  color: grey;
  line-height: normal;
`;

const MenuItem = styled.div`
  list-style: none;
  padding: 0;
  /* color: grey; */
  margin: 0 0 15px 0;
  font-size: 14px;
  line-height: normal;
`;

export default List;

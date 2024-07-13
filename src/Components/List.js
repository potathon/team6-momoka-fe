import { useState, useEffect, useCallback } from "react";
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
    if (items.length) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c2542a7c3d69bd1d3f1565cc7ea51b7a&libraries=services&autoload=false`;
      document.head.appendChild(script);

      script.onload = async () => {
        window.kakao.maps.load(async () => {
          const ps = new window.kakao.maps.services.Places();

          const searchPlace = (keyword) => {
            return new Promise((resolve, reject) => {
              ps.keywordSearch(
                `제주 ${keyword}`,
                (data, status, pagination) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    resolve(data[0]);
                  } else {
                    reject(status);
                  }
                }
              );
            });
          };

          searchPlace(item.name)
            .then((place) => {
              window.open(place.place_url, "_blank");
            })
            .catch((error) => {
              console.error("Failed to search place: ", error);
            });
        });
      };
    }
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
        `http://ec2-52-79-127-33.ap-northeast-2.compute.amazonaws.com:4000/api/restaurant/search?keyword=${keyword}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        });
    } else {
      fetch(
        "http://ec2-52-79-127-33.ap-northeast-2.compute.amazonaws.com:4000/api/restaurant"
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        });
    }
  }, [keyword, setItems]);

  return (
    <>
      {items?.length > 0 && (
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
      )}
    </>
  );
};
const ListContainer = styled.div`
  max-width: 430px; /* 너비를 320px로 설정 */
  width: 100%;
  min-height: calc(100vh - 340px);
  height: 100%;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  width: calc(100% - 20px);
  max-width: 430px;
  border: 1px solid #eeeef0;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
  border-radius: 16px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 2px solid #ffa34e;
    transform: scale(1.01);
    /* transition: scale 0.3s; */
  }
  &:last-child {
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

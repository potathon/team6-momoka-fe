import React, { useEffect } from "react";
import { useResultStore } from "../store/useResultStore.js";
import styled from "styled-components";

const KakaoMap = () => {
  const { items } = useResultStore();
  useEffect(() => {
    if (items.length) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c2542a7c3d69bd1d3f1565cc7ea51b7a&libraries=services&autoload=false`;
      document.head.appendChild(script);

      script.onload = async () => {
        window.kakao.maps.load(async () => {
          const container = document.getElementById("map"); // 지도를 표시할 div
          const options = {
            center: new window.kakao.maps.LatLng(33.35225, 126.533667), // 지도의 중심좌표
            level: 12, // 지도의 확대 레벨
          };
          const map = new window.kakao.maps.Map(container, options); // 지도를 생성합니다.

          // 마커를 클릭하면 장소명을 표출할 인포윈도우입니다
          const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

          // 장소 검색 객체를 생성합니다
          const ps = new window.kakao.maps.services.Places();
          // console.log(props);
          const searchKeywordList = items;

          // #############테스트######################

          // // 키워드로 장소를 검색하는 함수
          console.time("Marker display time (original)");
          const searchPlace = (keyword) => {
            return new Promise((resolve, reject) => {
              ps.keywordSearch(keyword, (data, status, pagination) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  resolve(data[0]);
                } else {
                  reject(status);
                }
              });
            });
          };
          // 모든 키워드에 대해 병렬로 검색을 수행
          const searchResults = await Promise.all(
            // 각 키워드에 대해 searchPlace 함수를 호출하여 Promise 배열 생성
            searchKeywordList
              .map((keyword) => searchPlace(`제주 ${keyword.name}`))
              // 각 Promise에 대해 오류를 처리하여 ZERO_RESULT인 경우 null 반환
              .map((p) =>
                p.catch((e) =>
                  e === window.kakao.maps.services.Status.ZERO_RESULT ? null : e
                )
              )
          );

          // 유효한 검색 결과만 필터링 (null 값 제외)
          const validResults = searchResults.filter(
            (result) => result !== null
          );

          // LatLngBounds 객체를 생성하여 검색된 장소의 좌표를 추가
          const bounds = new window.kakao.maps.LatLngBounds();
          validResults.forEach((place) => {
            displayMarker(place); // 각 장소에 대해 마커를 표시
            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x)); // 지도 범위에 좌표 추가
          });
          console.timeEnd("Marker display time (original)");

          //###############테스트 end#####################

          //###############변경전 end#####################
          // // 기존 코드
          // const restaurantList = [];
          // console.time("Marker display time (original)");

          // // 키워드로 장소를 검색하는 함수
          // const searchPlace = (keyword) => {
          //   return new Promise((resolve, reject) => {
          //     ps.keywordSearch(keyword, (data, status, pagination) => {
          //       if (status === window.kakao.maps.services.Status.OK) {
          //         resolve(data[0]);
          //       } else {
          //         reject(status);
          //       }
          //     });
          //   });
          // };

          // // 각 키워드에 대해 검색을 수행
          // for (const keyword of searchKeywordList) {
          //   try {
          //     const result = await searchPlace(`제주 ${keyword.name}`);
          //     restaurantList.push(result);
          //   } catch (error) {
          //     if (error === window.kakao.maps.services.Status.ZERO_RESULT) {
          //     } else {
          //       console.error(
          //         `Error occurred while searching for ${keyword.name}:`,
          //         error
          //       );
          //     }
          //   }
          // }

          // // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // // LatLngBounds 객체에 좌표를 추가합니다
          // const bounds = new window.kakao.maps.LatLngBounds();

          // for (const place of restaurantList) {
          //   displayMarker(place);
          //   bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
          // }
          // console.timeEnd("Marker display time (original)");
          //###############변경전 end#####################

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);

          // 지도에 마커를 표시하는 함수입니다
          function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: new window.kakao.maps.LatLng(place.y, place.x),
            });

            // 마커에 클릭이벤트를 등록합니다
            window.kakao.maps.event.addListener(marker, "click", () => {
              infowindow.close();

              infowindow.setContent(`
                        <div class="wrap"> 
                            <div class="infowindow-content">
                                <div class="title">
                                    ${place.place_name}  
                                </div>
                                <div class="body">
                                    <div class="desc">
                                        <div class="ellipsis">${place.road_address_name}</div>
                                        <div>
                                        <a href="${place.place_url}" target="_blank" class="link">카카오맵 웹에서 열기</a> <br>
                                        <a href="kakaomap://look?p=${place.y},${place.x}" target="_blank">카카오맵 앱에서 열기</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);

              // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
              infowindow.open(map, marker);
            });

            // 지도 클릭 이벤트를 추가하여 인포윈도우 닫기
            window.kakao.maps.event.addListener(map, "click", () => {
              infowindow.close();
            });
          }
        });
      };

      return () => script.remove();
    }
  }, [items]);

  return (
    <>
      <MapContainer id="map" />
    </>
  );
};
const MapContainer = styled.div`
  width: calc(100% - 20px);
  max-width: 430px;
  height: 200px;

  .infowindow-content {
    padding: 5px;
    font-size: 12px;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .infowindow-content a {
    color: #1e90ff;
    text-decoration: none;
  }

  .infowindow-content a:hover {
    text-decoration: underline;
  }
`;

export default KakaoMap;

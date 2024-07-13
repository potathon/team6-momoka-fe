// MapContainer.js
import React from 'react';
import styled from 'styled-components';



const MapContainer = () => {
  return (
    <MapWrapper>
      <PlaceholderText>Map will be displayed here</PlaceholderText>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  width: 336px;
  height: 200px;
  background-color: #white; /* 임시 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc; /* 임시 테두리 */
  margin: 15px 0; /* 위 아래 15px씩 마진 */
`;

const PlaceholderText = styled.div`
  font-size: 18px;
  color: #aaa;
`;


export default MapContainer;

// App.js
import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header.js';
import SearchBar from '../Components/Search.js';
import List from '../Components/List.js';
import MapContainer from '../Components/Map.js';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: #f0f0f0;
`;

const dummyData = [
  {
    title: '식당A',
    location: '제주도 제주시',
    tell: '1234-1234',
    operatingHours: '9:00 AM - 10:00 PM',
    menulist: ['고등어회 13,000원']
  },
  {
    title: '카페B',
    location: '제주도 서귀포시',
    tell: '5678-5678',
    operatingHours: '9:00 AM - 10:00 PM',
    menulist: ['제주도 당근 케이크']
  },
  {
    title: '식당A',
    location: '제주도 제주시',
    tell: '1234-1234',
    operatingHours: '9:00 AM - 10:00 PM',
    menulist: ['고등어회 13,000원']
  },
  {
    title: '카페B',
    location: '제주도 서귀포시',
    tell: '5678-5678',
    operatingHours: '9:00 AM - 10:00 PM',
    menulist: ['제주도 당근 케이크']
  },
  {
    title: '식당A',
    location: '제주도 제주시',
    tell: '1234-1234',
    operatingHours: '9:00 AM - 10:00 PM',
    menulist: ['고등어회 13,000원']
  },
  {
    title: '카페B',
    location: '제주도 서귀포시',
    tell: '5678-5678',
    operatingHours: '9:00 AM - 10:00 PM',
    menulist: ['제주도 당근 케이크']
  }
];

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <SearchBar />
      <MapContainer />
      <List items={dummyData} />
    </MainContainer>
  );
};

export default MainPage;

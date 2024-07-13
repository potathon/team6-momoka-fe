// App.js
import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header.js';
import SearchBar from '../Components/Search.js';
import List from '../Components/List.js';
import MapContainer from '../Components/Map.js';


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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: #f0f0f0;
`;


const dummyData = [
  {
    title: '비자림길(서치)',
    location: '제주시 구좌읍 비자림로 2682',
    tell: '0507-1375-5118',
    operatingHours: '11:30-23:00 (화요일 휴무)',
    menulist: ['모듬회(소) 25000 모듬초밥(10p) 13000 광어초밥(10p) 15000 연어초밥(10p) 15000']
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

export default MainPage;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Page from './Pages/MainPage.jsx';  // 상대 경로가 맞는지 확인하기

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}
//수정
export default App;

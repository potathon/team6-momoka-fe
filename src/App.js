// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Page from './Pages/MainPage.jsx'; 
import Search from './Pages/SearchPage.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

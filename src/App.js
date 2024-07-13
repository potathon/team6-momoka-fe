import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

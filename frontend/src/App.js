import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Inventory from "./pages/Inventory";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventaire" element={<Inventory />} />
        </Routes>
      </Router>
  );
}

export default App;

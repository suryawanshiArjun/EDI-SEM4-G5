import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import CollegeFinder from './pages/CollegeFinder';
import Scholarships from './pages/Scholarships';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/quiz"        element={<Quiz />} />
          <Route path="/results"     element={<Results />} />
          <Route path="/colleges"    element={<CollegeFinder />} />
          <Route path="/scholarships" element={<Scholarships />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
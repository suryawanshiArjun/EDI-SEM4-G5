import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Quiz from './pages/Quiz';
import Results from './pages/Results';
import CollegeFinder from './pages/CollegeFinder';
import Scholarships from './pages/Scholarships';
import CollegePredictor from './pages/CollegePredictor';
import PathwaysAfter10th from './pages/PathwaysAfter10th';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <Router>

      <div className="App">

        <Routes>

          {/* DEFAULT PAGE */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* OTHER PAGES */}
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/quiz"
            element={<Quiz />}
          />

          <Route
            path="/results"
            element={<Results />}
          />

          <Route
            path="/colleges"
            element={<CollegeFinder />}
          />

          <Route
            path="/scholarships"
            element={<Scholarships />}
          />

          <Route
            path="/predictor"
            element={<CollegePredictor />}
          />

          <Route
            path="/pathways"
            element={<PathwaysAfter10th />}
          />

        </Routes>

      </div>

    </Router>
  );
}

export default App;
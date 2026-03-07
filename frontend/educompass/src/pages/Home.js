import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          🧭 EduCompass
        </div>
        <div className="nav-links">
          <a href="/colleges">College Finder</a>
          <a href="/scholarships">Scholarships</a>
          <button onClick={() => navigate('/quiz')}>
            Take Quiz
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect
            <span className="highlight"> Career Path</span>
          </h1>
          <p>
            From Class 10 to your dream career —
            EduCompass guides you every step of the way
            with personalized recommendations,
            college finder, and scholarship alerts.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate('/quiz')}>
              Start Aptitude Quiz 🎯
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/colleges')}>
              Find Colleges 🏛️
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">
            <div className="stat">
              <h2>8,129+</h2>
              <p>Colleges Listed</p>
            </div>
            <div className="stat">
              <h2>4,462+</h2>
              <p>Career Paths</p>
            </div>
            <div className="stat">
              <h2>5,000+</h2>
              <p>Scholarships</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features">
        <h2>Everything You Need in One Place</h2>
        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Aptitude Quiz</h3>
            <p>20 questions to discover your
               strengths and ideal career path</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Career Pathways</h3>
            <p>Visual map from your stream
               to real world jobs and salaries</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>College Finder</h3>
            <p>Search 8000+ government colleges
               by state, stream and fees</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Scholarships</h3>
            <p>Find scholarships you qualify for
               based on your profile</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Salary Insights</h3>
            <p>Know what you can earn before
               choosing your career path</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Advisor</h3>
            <p>Chat with our AI for personalized
               academic guidance anytime</p>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Profile</h3>
            <p>Enter your class, stream, marks and location</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Take Quiz</h3>
            <p>Answer 20 aptitude questions</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Results</h3>
            <p>See your top career matches</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Find Colleges</h3>
            <p>Discover colleges near you</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>🧭 EduCompass — From School to Career</p>
        <p>Empowering Students · Strengthening
           Government Institutions · Building Careers</p>
      </footer>

    </div>
  );
}

export default Home;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results  = location.state?.results || [];

  if (!results.length) {
    return (
      <div style={{textAlign:'center', padding:'60px'}}>
        <h2>No results found</h2>
        <p style={{color:'#666', margin:'15px 0'}}>
          Please take the quiz first
        </p>
        <button onClick={() => navigate('/quiz')}
          style={{marginTop:'20px', padding:'12px 25px',
            background:'#0D4F5C', color:'white',
            border:'none', borderRadius:'25px',
            cursor:'pointer', fontSize:'16px'}}>
          Take Quiz 🎯
        </button>
      </div>
    );
  }

  const top = results[0];

  return (
    <div className="results-page">

      <div className="results-header">
        <h1>🎉 Your Career Matches!</h1>
        <p>Based on your personality, interests and strengths</p>
        <div className="disclaimer">
          💡 These are suggestions, not rules.
          Any stream can lead to any career!
        </div>
      </div>

      {/* TOP MATCH */}
      <div className="top-match-card">
        <div className="top-badge">⭐ Best Match</div>
        <div className="result-icon">{top.icon}</div>
        <h2>{top.career}</h2>
        <div className="match-badge">{top.match}% Match</div>
        <p className="result-description">{top.desc}</p>
        <div className="top-details">
          <div className="top-detail">
            <h4>🎓 Recommended Degrees</h4>
            <p>{top.degrees.join(", ")}</p>
          </div>
          <div className="top-detail">
            <h4>💰 Expected Salary</h4>
            <p>{top.salary} per year</p>
          </div>
        </div>
      </div>

      {/* OTHER MATCHES */}
      {results.length > 1 && (
        <>
          <h3 className="other-title">
            🎯 Other Great Options For You
          </h3>
          <div className="other-matches">
            {results.slice(1).map((r, i) => (
              <div key={i} className="other-card">
                <div className="other-icon">{r.icon}</div>
                <div className="other-info">
                  <h3>{r.career}</h3>
                  <p>{r.desc}</p>
                  <div className="other-meta">
                    <span>🎓 {r.degrees[0]}</span>
                    <span>💰 {r.salary}</span>
                  </div>
                </div>
                <div className="other-match">{r.match}%</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* BUTTONS */}
      <div className="result-actions">
        <button className="btn-primary"
          onClick={() => navigate('/colleges')}>
          Find Colleges 🏛️
        </button>
        <button className="btn-secondary"
          onClick={() => navigate('/scholarships')}>
          Find Scholarships 💰
        </button>
        <button className="btn-outline"
          onClick={() => navigate('/quiz')}>
          Retake Quiz 🔄
        </button>
      </div>

    </div>
  );
}

export default Results;
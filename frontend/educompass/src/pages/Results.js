import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const careerInfo = {
  'Software Engineer': {
    icon: '💻',
    desc: 'Design, develop and maintain software applications and systems.',
    degrees: ['B.E Computer Science', 'B.Tech IT', 'BCA + MCA'],
    salary: '₹6L - ₹25L'
  },
  'Data Scientist': {
    icon: '📊',
    desc: 'Analyse complex data to help organisations make better decisions.',
    degrees: ['B.Tech CS', 'B.Sc Statistics', 'M.Tech Data Science'],
    salary: '₹7L - ₹30L'
  },
  'Civil / Mechanical Engineer': {
    icon: '⚙️',
    desc: 'Design and build infrastructure, machines and mechanical systems.',
    degrees: ['B.E Civil', 'B.E Mechanical', 'B.Tech Engineering'],
    salary: '₹4L - ₹15L'
  },
  'Doctor / Healthcare': {
    icon: '🏥',
    desc: 'Diagnose and treat patients, promoting health and preventing disease.',
    degrees: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
    salary: '₹8L - ₹40L'
  },
  'Scientist / Researcher': {
    icon: '🔬',
    desc: 'Conduct research and experiments to expand human knowledge.',
    degrees: ['B.Sc + M.Sc', 'PhD', 'B.Tech + Research'],
    salary: '₹5L - ₹20L'
  },
  'Teacher / Educator': {
    icon: '📚',
    desc: 'Inspire and educate students, shaping the future generation.',
    degrees: ['B.Ed', 'B.A + B.Ed', 'M.A Education'],
    salary: '₹3L - ₹12L'
  },
  'Lawyer': {
    icon: '⚖️',
    desc: 'Represent clients in legal matters and uphold justice.',
    degrees: ['LLB', 'BA LLB', 'BBA LLB'],
    salary: '₹4L - ₹25L'
  },
  'Business Manager / Entrepreneur': {
    icon: '💼',
    desc: 'Lead organisations, manage teams and drive business growth.',
    degrees: ['BBA', 'MBA', 'B.Com + MBA'],
    salary: '₹5L - ₹30L'
  },
  'Financial Analyst / Accountant': {
    icon: '💰',
    desc: 'Manage finances, analyse investments and ensure financial health.',
    degrees: ['B.Com', 'CA', 'BBA Finance', 'MBA Finance'],
    salary: '₹4L - ₹20L'
  },
  'Psychologist / Counsellor': {
    icon: '🧠',
    desc: 'Help people understand and manage their mental health and emotions.',
    degrees: ['B.Sc Psychology', 'MA Psychology', 'M.Phil Clinical'],
    salary: '₹3L - ₹15L'
  },
  'Artist / Content Creator': {
    icon: '🎨',
    desc: 'Create visual, written or digital content that inspires and engages.',
    degrees: ['BFA', 'BMM', 'BA Media', 'Self-taught + Portfolio'],
    salary: '₹2L - ₹20L'
  },
  'Graphic / UX Designer': {
    icon: '🖥️',
    desc: 'Design beautiful and user-friendly interfaces and visual content.',
    degrees: ['B.Des', 'BFA', 'B.Tech + Design', 'Diploma Design'],
    salary: '₹3L - ₹18L'
  },
};

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results  = location.state?.results || [];

  if (!results.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2>No results found</h2>
        <p style={{ color: '#666', margin: '15px 0' }}>
          Please take the quiz first
        </p>
        <button onClick={() => navigate('/quiz')}
          style={{
            marginTop: '20px', padding: '12px 25px',
            background: '#0D4F5C', color: 'white',
            border: 'none', borderRadius: '25px',
            cursor: 'pointer', fontSize: '16px'
          }}>
          Take Quiz 🎯
        </button>
      </div>
    );
  }

  const top = results[0];
  const info = careerInfo[top.career] || {
    icon: '🎯',
    desc: 'A great career that matches your skills and interests.',
    degrees: ['Bachelor\'s Degree in related field'],
    salary: '₹4L - ₹20L'
  };

  return (
    <div className="results-page">

      {/* HEADER */}
      <div className="results-header">
        <h1>🎉 Your Career Matches!</h1>
        <p>Based on your personality, interests and strengths</p>
        <div className="disclaimer">
          💡 These are AI predictions — explore all options with an open mind!
        </div>
      </div>

      {/* TOP MATCH */}
      <div className="top-match-card">
        <div className="top-badge">⭐ Best Match</div>
        <div className="result-icon">{info.icon}</div>
        <h2>{top.career}</h2>
        <div className="match-badge">{top.match}% Match</div>
        <p className="result-description">{info.desc}</p>
        <div className="top-details">
          <div className="top-detail">
            <h4>🎓 Recommended Degrees</h4>
            <p>{info.degrees.join(', ')}</p>
          </div>
          <div className="top-detail">
            <h4>💰 Expected Salary</h4>
            <p>{info.salary} per year</p>
          </div>
        </div>
      </div>

      {/* OTHER MATCHES */}
      {results.length > 1 && (
        <>
          <h3 className="other-title">🎯 Other Great Options For You</h3>
          <div className="other-matches">
            {results.slice(1).map((r, i) => {
              const rInfo = careerInfo[r.career] || {
                icon: '🎯',
                desc: 'A great career that matches your interests.',
                degrees: ['Related Bachelor\'s Degree'],
                salary: '₹4L - ₹20L'
              };
              return (
                <div key={i} className="other-card">
                  <div className="other-icon">{rInfo.icon}</div>
                  <div className="other-info">
                    <h3>{r.career}</h3>
                    <p>{rInfo.desc}</p>
                    <div className="other-meta">
                      <span>🎓 {rInfo.degrees[0]}</span>
                      <span>💰 {rInfo.salary}</span>
                    </div>
                  </div>
                  <div className="other-match">{r.match}%</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* BUTTONS */}
      <div className="result-actions">
        <button className="btn-primary"
          onClick={() => navigate('/colleges', {
            state: { profession: top.career }
          })}>
          Find Colleges for {top.career} 🏛️
        </button>
        <button className="btn-secondary"
          onClick={() => navigate('/scholarships', {
            state: { profession: top.career }
          })}>
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
import React, { useState } from 'react';
import './CollegePredictor.css';

const ENGG_CATEGORIES = [
  { code: 'GOPENS', label: 'Open (State)' },
  { code: 'GSCS',   label: 'SC (State)' },
  { code: 'GSTS',   label: 'ST (State)' },
  { code: 'GOBCS',  label: 'OBC (State)' },
  { code: 'GVJS',   label: 'VJ (State)' },
  { code: 'GNT1S',  label: 'NT1 (State)' },
  { code: 'GNT2S',  label: 'NT2 (State)' },
  { code: 'GNT3S',  label: 'NT3 (State)' },
  { code: 'LOPENS', label: 'Open Ladies' },
  { code: 'TFWS',   label: 'Tuition Fee Waiver' },
  { code: 'EWS',    label: 'EWS' },
  { code: 'DEFOPENS', label: 'Defence' },
];

const PHARMA_CATEGORIES = [
  { code: 'GOPENH', label: 'Open (Home Univ)' },
  { code: 'GSCH',   label: 'SC (Home Univ)' },
  { code: 'GSTH',   label: 'ST (Home Univ)' },
  { code: 'GOBCH',  label: 'OBC (Home Univ)' },
  { code: 'GOPENO', label: 'Open (Other Univ)' },
  { code: 'LOPENH', label: 'Open Ladies' },
  { code: 'EWS',    label: 'EWS' },
];

function CollegePredictor() {
  const [examType,   setExamType]   = useState('ENGG');
  const [percentile, setPercentile] = useState('');
  const [category,   setCategory]   = useState('GOPENS');
  const [course,     setCourse]     = useState('');
  const [results,    setResults]    = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');

  const categories = examType === 'ENGG' ? ENGG_CATEGORIES : PHARMA_CATEGORIES;

  const handleExamChange = (val) => {
    setExamType(val);
    setCategory(val === 'ENGG' ? 'GOPENS' : 'GOPENH');
    setResults(null);
  };

  const handlePredict = async () => {
    if (!percentile || percentile < 0 || percentile > 100) {
      setError('Please enter a valid percentile between 0 and 100');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);
    try {
      let url = `http://localhost:5000/api/predictor?exam_type=${examType}&percentile=${percentile}&category=${category}`;
      if (course) url += `&course=${encodeURIComponent(course)}`;
      const res  = await fetch(url);
      const data = await res.json();
      if (data.success) setResults(data);
      else setError('Something went wrong. Try again.');
    } catch {
      setError('Cannot connect to server. Make sure backend is running!');
    }
    setLoading(false);
  };

  const CollegeCard = ({ item, type }) => {
    const colors = {
      safe:  { bg: '#e8f8f0', border: '#27ae60', badge: '#27ae60', label: 'SAFE' },
      good:  { bg: '#fff8e8', border: '#E8A624', badge: '#E8A624', label: 'GOOD' },
      reach: { bg: '#fef0f0', border: '#e74c3c', badge: '#e74c3c', label: 'REACH' },
    };
    const c = colors[type];
    const trend = item.trend === 'Rising' ? '↑' : item.trend === 'Falling' ? '↓' : '→';

    return (
      <div className="pred-card" style={{ borderLeft: `4px solid ${c.border}`, background: c.bg }}>
        <div className="pred-card-top">
          <div className="pred-college-info">
            <h3>{item.college_name}</h3>
            <p>{item.course_name}</p>
            <span className="pred-type-tag">{item.college_type}</span>
          </div>
          <div className="pred-badge" style={{ background: c.badge }}>
            {c.label}
          </div>
        </div>
        <div className="pred-card-bottom">
          <div className="pred-stat">
            <span>Latest Cutoff</span>
            <strong>{item.latest_cutoff.toFixed(4)}</strong>
          </div>
          <div className="pred-stat">
            <span>Your Percentile</span>
            <strong>{parseFloat(item.your_perc).toFixed(4)}</strong>
          </div>
          <div className="pred-stat">
            <span>Difference</span>
            <strong style={{ color: c.border }}>
              {(item.your_perc - item.latest_cutoff).toFixed(4)}
            </strong>
          </div>
          <div className="pred-stat">
            <span>Trend</span>
            <strong>{trend} {item.trend}</strong>
          </div>
          <div className="pred-years">
            {Object.entries(item.cutoffs).sort().map(([yr, val]) => (
              <span key={yr} className="pred-year-chip">
                {yr}: {parseFloat(val).toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="predictor-page">

      <div className="predictor-header">
        <h1>🎯 College Predictor</h1>
        <p>Enter your MHT-CET percentile and find colleges you can get</p>
        <p className="pred-subtitle">Based on CAP Round cutoffs from 2022 & 2023</p>
      </div>

      <div className="predictor-form">

        <div className="form-row">
          <div className="form-group">
            <label>Exam Type</label>
            <div className="exam-toggle">
              <button
                className={examType === 'ENGG' ? 'active' : ''}
                onClick={() => handleExamChange('ENGG')}>
                ⚙️ Engineering
              </button>
              <button
                className={examType === 'PHARMA' ? 'active' : ''}
                onClick={() => handleExamChange('PHARMA')}>
                💊 Pharmacy
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Your MHT-CET Percentile</label>
            <input
              type="number"
              min="0" max="100" step="0.0001"
              placeholder="e.g. 95.4321"
              value={percentile}
              onChange={e => setPercentile(e.target.value)}
              className="perc-input"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="cat-select">
              {categories.map(c => (
                <option key={c.code} value={c.code}>
                  {c.label} ({c.code})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Branch (optional)</label>
            <input
              type="text"
              placeholder="e.g. Computer, Civil..."
              value={course}
              onChange={e => setCourse(e.target.value)}
              className="perc-input"
            />
          </div>
        </div>

        {error && <p className="pred-error">{error}</p>}

        <button
          className="predict-btn"
          onClick={handlePredict}
          disabled={loading}>
          {loading ? 'Finding Colleges...' : 'Find My Colleges 🎯'}
        </button>

      </div>

      {loading && (
        <div className="pred-loading">
          <div className="pred-spinner"></div>
          <p>Analysing cutoff data...</p>
        </div>
      )}

      {results && (
        <div className="pred-results">

          <div className="pred-summary">
            <div className="sum-card safe-sum">
              <h3>{results.safe.length}</h3>
              <p>Safe Colleges</p>
            </div>
            <div className="sum-card good-sum">
              <h3>{results.good.length}</h3>
              <p>Good Colleges</p>
            </div>
            <div className="sum-card reach-sum">
              <h3>{results.reach.length}</h3>
              <p>Reach Colleges</p>
            </div>
          </div>

          <div className="pred-legend">
            <span className="leg safe-leg">🟢 Safe = Your percentile is 3+ above cutoff</span>
            <span className="leg good-leg">🟡 Good = Within 2 percentile of cutoff</span>
            <span className="leg reach-leg">🔴 Reach = Cutoff is up to 5 above yours</span>
          </div>

          {results.safe.length > 0 && (
            <div className="pred-section">
              <h2 className="section-title safe-title">✅ Safe Colleges ({results.safe.length})</h2>
              <div className="pred-grid">
                {results.safe.map((item, i) => (
                  <CollegeCard key={i} item={item} type="safe" />
                ))}
              </div>
            </div>
          )}

          {results.good.length > 0 && (
            <div className="pred-section">
              <h2 className="section-title good-title">🎯 Good Colleges ({results.good.length})</h2>
              <div className="pred-grid">
                {results.good.map((item, i) => (
                  <CollegeCard key={i} item={item} type="good" />
                ))}
              </div>
            </div>
          )}

          {results.reach.length > 0 && (
            <div className="pred-section">
              <h2 className="section-title reach-title">🚀 Reach Colleges ({results.reach.length})</h2>
              <div className="pred-grid">
                {results.reach.map((item, i) => (
                  <CollegeCard key={i} item={item} type="reach" />
                ))}
              </div>
            </div>
          )}

          {results.safe.length === 0 && results.good.length === 0 && results.reach.length === 0 && (
            <div className="no-results">
              <p>😕 No colleges found for this percentile and category.</p>
              <p>Try a different category or lower your percentile filter.</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default CollegePredictor;
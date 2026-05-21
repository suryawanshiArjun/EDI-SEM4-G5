import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Scholarships.css';

const STATES = [
  'All', 'All India', 'Maharashtra', 'Delhi', 'Tamil Nadu',
  'Karnataka', 'West Bengal', 'Uttar Pradesh', 'Rajasthan',
  'Gujarat', 'Punjab', 'Haryana', 'Andhra Pradesh', 'Telangana',
  'Kerala', 'Madhya Pradesh', 'Bihar', 'Odisha', 'Assam'
];

const COMMUNITIES = [
  'All', 'General', 'OBC', 'SC', 'ST', 'Minority', 'EWS',
  'VJNT', 'SBC', 'EBC', 'NT-B', 'NT-C', 'NT-D'
];

const GENDERS = ['All', 'Male', 'Female'];

function Scholarships() {
  const location = useLocation();
  const navigate = useNavigate();
  const profession = location.state?.profession || '';

  const [scholarships, setScholarships] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [gender, setGender] = useState('All');
  const [community, setCommunity] = useState('All');
  const [state, setState] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const fetchScholarships = async () => {
    setLoading(true);
    setError('');

    try {
      let url = `http://localhost:5000/api/scholarships?page=${page}&limit=12`;

      if (profession)
        url += `&profession=${encodeURIComponent(profession)}`;

      if (gender !== 'All')
        url += `&gender=${encodeURIComponent(gender)}`;

      if (community !== 'All')
        url += `&community=${encodeURIComponent(community)}`;

      if (state !== 'All')
        url += `&state=${encodeURIComponent(state)}`;

      if (search)
        url += `&search=${encodeURIComponent(search)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setScholarships(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } else {
        setError('Failed to load scholarships.');
      }
    } catch {
      setError('Cannot connect to server. Make sure backend is running!');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchScholarships();
  }, [page, gender, community, state, search, profession]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleFilter = (setter, val) => {
    setter(val);
    setPage(1);
  };

  return (
    <div className="sch-page">

      {/* HEADER */}
      <div className="sch-header">
        <h1>💰 Scholarship Finder</h1>

        <p>
          {profession ? (
            <>
              Showing scholarships for <strong>{profession}</strong> —{' '}
              {total.toLocaleString()} found
            </>
          ) : (
            <>
              {total.toLocaleString()} scholarships from across India
            </>
          )}
        </p>
      </div>

      {/* PROFESSION BANNER */}
      {profession && (
        <div className="profession-banner">
          <span>
            🎯 Filtered for: <strong>{profession}</strong>
          </span>

          <button
            className="clear-btn"
            onClick={() => navigate('/scholarships')}
          >
            Show All ✕
          </button>
        </div>
      )}

      {/* FILTERS */}
      <div className="sch-filters">

        <div className="search-wrap">
          <input
            className="sch-search"
            type="text"
            placeholder="🔍 Search by name or provider..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        <select
          className="sch-select"
          value={gender}
          onChange={(e) => handleFilter(setGender, e.target.value)}
        >
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g === 'All' ? 'All Genders' : g}
            </option>
          ))}
        </select>

        <select
          className="sch-select"
          value={community}
          onChange={(e) => handleFilter(setCommunity, e.target.value)}
        >
          {COMMUNITIES.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Categories' : c}
            </option>
          ))}
        </select>

        <select
          className="sch-select"
          value={state}
          onChange={(e) => handleFilter(setState, e.target.value)}
        >
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All States' : s}
            </option>
          ))}
        </select>
      </div>

      {/* COUNT */}
      <div className="sch-count">
        {loading
          ? 'Loading...'
          : `Showing ${scholarships.length} of ${total.toLocaleString()} — Page ${page} of ${totalPages}`}
      </div>

      {/* ERROR */}
      {error && <div className="sch-error">⚠️ {error}</div>}

      {/* LOADING */}
      {loading && (
        <div className="sch-loading">
          <div className="spinner"></div>
          <p>Loading scholarships...</p>
        </div>
      )}

      {/* CARDS */}
      {!loading && !error && (
        <div className="sch-list">

          {scholarships.map((s, i) => (
            <div key={i} className="sch-card">

              {/* LEFT */}
              <div className="sch-left">

                <div className="sch-icon">🎓</div>

                <div className="sch-info">

                  <h3>{s.scholarship_name}</h3>

                  <p className="sch-provider">
                    By {s.provider}
                  </p>

                  <div className="sch-tags">

                    {s.field && s.field !== 'All' && (
                      <span className="stag field-tag">
                        📚 {s.field}
                      </span>
                    )}

                    {s.gender && s.gender !== 'All' && (
                      <span className="stag">
                        👤 {s.gender}
                      </span>
                    )}

                    {s.community && s.community !== 'All' && (
                      <span className="stag">
                        🏷️ {s.community}
                      </span>
                    )}

                    {s.state && s.state !== 'All India' && (
                      <span className="stag state-tag">
                        📍 {s.state}
                      </span>
                    )}

                  </div>

                  <div className="sch-details">

                    {s.qualification && (
                      <span>🎓 {s.qualification}</span>
                    )}

                    {s.income && (
                      <span>💵 Income: {s.income}</span>
                    )}

                    {s.percentage && (
                      <span>📊 Marks: {s.percentage}%</span>
                    )}

                    {s.deadline && (
                      <span>📅 Deadline: {s.deadline}</span>
                    )}

                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="sch-right">

                <div className="sch-amount">
                  {s.amount}
                </div>

                <a
                  href={s.apply_link || 'https://scholarships.gov.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-apply"
                >
                  Apply Now →
                </a>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* NO RESULTS */}
      {!loading && !error && scholarships.length === 0 && (
        <div className="sch-empty">
          <p>😕 No scholarships found for your filters.</p>
          <p>Try removing some filters!</p>
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="pagination">

          <button
            className="page-btn"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            « First
          </button>

          <button
            className="page-btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ← Prev
          </button>

          {Array.from(
            { length: Math.min(5, totalPages) },
            (_, i) => {
              let n;

              if (totalPages <= 5) n = i + 1;
              else if (page <= 3) n = i + 1;
              else if (page >= totalPages - 2) n = totalPages - 4 + i;
              else n = page - 2 + i;

              return (
                <button
                  key={n}
                  className={`page-btn ${page === n ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              );
            }
          )}

          <button
            className="page-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>

          <button
            className="page-btn"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last »
          </button>

        </div>
      )}

    </div>
  );
}

export default Scholarships;
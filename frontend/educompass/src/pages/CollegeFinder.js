import React, { useState, useEffect } from 'react';
import './CollegeFinder.css';

const states  = ["All States", "Tamil Nadu", "Maharashtra", "Delhi", "Karnataka", "West Bengal", "Uttar Pradesh", "Rajasthan", "Gujarat", "Punjab", "Haryana"];
const streams = ["All Streams", "Engineering", "Medical", "Arts/Commerce", "Science", "Management"];

function CollegeFinder() {
  const [colleges,       setColleges]       = useState([]);
  const [total,          setTotal]          = useState(0);
  const [totalPages,     setTotalPages]     = useState(0);
  const [page,           setPage]           = useState(1);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState('');
  const [selectedState,  setSelectedState]  = useState('All States');
  const [selectedStream, setSelectedStream] = useState('All Streams');
  const [search,         setSearch]         = useState('');
  const [searchInput,    setSearchInput]    = useState('');

  const fetchColleges = async () => {
    setLoading(true);
    setError('');
    try {
      let url = `http://localhost:5000/api/colleges?page=${page}&limit=12`;
      if (selectedState  !== 'All States')  url += `&state=${selectedState}`;
      if (selectedStream !== 'All Streams') url += `&stream=${selectedStream}`;
      if (search) url += `&search=${search}`;

      const response = await fetch(url);
      const data     = await response.json();

      if (data.success) {
        setColleges(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } else {
        setError('Failed to load colleges');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running!');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, [page, selectedState, selectedStream, search]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleFilter = (setter, value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="college-page">

      {/* HEADER */}
      <div className="college-header">
        <h1>🏛️ College Finder</h1>
        <p>Search from <strong>{total.toLocaleString()}</strong> colleges across India</p>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search college name..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
        <select
          value={selectedState}
          onChange={e => handleFilter(setSelectedState, e.target.value)}
          className="filter-select">
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={selectedStream}
          onChange={e => handleFilter(setSelectedStream, e.target.value)}
          className="filter-select">
          {streams.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* RESULTS COUNT */}
      <div className="results-count">
        {loading ? 'Loading...' : `Showing ${colleges.length} of ${total.toLocaleString()} colleges — Page ${page} of ${totalPages}`}
      </div>

      {/* ERROR */}
      {error && (
        <div className="error-box">
          ⚠️ {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading colleges...</p>
        </div>
      )}

      {/* COLLEGE CARDS */}
      {!loading && (
        <div className="colleges-grid">
          {colleges.map((college, index) => (
            <div key={index} className="college-card">
              <div className="college-card-header">
                <h3>{college.college_name}</h3>
                <span className="rating">⭐ {college.rating}</span>
              </div>
              <div className="college-info">
                <span className="tag">📍 {college.state}</span>
                <span className="tag">📚 {college.stream}</span>
                {college.college_type && (
                  <span className="tag gov">🏛️ {college.college_type}</span>
                )}
              </div>
              <div className="college-fee">
                <span>UG Fee:</span>
                <strong>₹{college.ug_fee || 'N/A'}</strong>
              </div>
              {college.placement_score && (
                <div className="college-fee">
                  <span>Placement Score:</span>
                  <strong>{college.placement_score}/10</strong>
                </div>
              )}
              <button className="btn-apply">View Details →</button>
            </div>
          ))}
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && colleges.length === 0 && !error && (
        <div className="no-results">
          <p>😕 No colleges found.</p>
          <p>Try different filters!</p>
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="page-btn">
            « First
          </button>
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            className="page-btn">
            ← Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`page-btn ${page === pageNum ? 'active' : ''}`}>
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className="page-btn">
            Next →
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="page-btn">
            Last »
          </button>
        </div>
      )}

    </div>
  );
}

export default CollegeFinder;
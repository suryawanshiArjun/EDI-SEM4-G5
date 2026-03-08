import React, { useState } from 'react';
import './Scholarships.css';

const scholarshipsData = [
  { name: "NSP - National Scholarship Portal", amount: "₹25,000/year", eligibility: "Class 10/12 pass, family income < 2.5L", gender: "All", category: "All", deadline: "Oct 31, 2025", ministry: "Ministry of Education" },
  { name: "Pragati Scholarship (AICTE)", amount: "₹50,000/year", eligibility: "Girl students in technical education", gender: "Female", category: "All", deadline: "Nov 30, 2025", ministry: "AICTE" },
  { name: "INSPIRE Scholarship", amount: "₹80,000/year", eligibility: "Top 1% in Class 12, pursuing B.Sc", gender: "All", category: "All", deadline: "Dec 15, 2025", ministry: "DST India" },
  { name: "Dr. Ambedkar Scholarship", amount: "₹10,000/year", eligibility: "SC/ST students post-matric", gender: "All", category: "SC/ST", deadline: "Oct 15, 2025", ministry: "Ministry of Social Justice" },
  { name: "Indira Gandhi Scholarship", amount: "₹36,200/year", eligibility: "Single girl child pursuing PG", gender: "Female", category: "All", deadline: "Dec 31, 2025", ministry: "UGC" },
  { name: "National Overseas Scholarship", amount: "Full Funding", eligibility: "SC/ST students for foreign study", gender: "All", category: "SC/ST", deadline: "Mar 31, 2026", ministry: "Ministry of Social Justice" },
  { name: "ONGC Scholarship", amount: "₹48,000/year", eligibility: "Merit based, engineering/medicine", gender: "All", category: "All", deadline: "Sep 30, 2025", ministry: "ONGC Foundation" },
  { name: "Disability Scholarship (NDF)", amount: "₹20,000/year", eligibility: "Students with 40%+ disability", gender: "All", category: "Disabled", deadline: "Nov 15, 2025", ministry: "Dept of Empowerment" },
  { name: "Begum Hazrat Mahal Scholarship", amount: "₹10,000/year", eligibility: "Minority girl students Class 9-12", gender: "Female", category: "Minority", deadline: "Oct 31, 2025", ministry: "Maulana Azad Foundation" },
  { name: "Post Matric Scholarship OBC", amount: "₹15,000/year", eligibility: "OBC students, income < 1L", gender: "All", category: "OBC", deadline: "Nov 30, 2025", ministry: "Ministry of Social Justice" },
  { name: "Merit cum Means Scholarship", amount: "₹30,000/year", eligibility: "Minority students pursuing professional courses", gender: "All", category: "Minority", deadline: "Dec 15, 2025", ministry: "Ministry of Minority Affairs" },
  { name: "Ishan Uday Scholarship", amount: "₹54,000/year", eligibility: "Students from North East India", gender: "All", category: "All", deadline: "Nov 30, 2025", ministry: "UGC" },
];

const genders    = ["All", "Female", "Male"];
const categories = ["All", "SC/ST", "OBC", "Minority", "Disabled", "General"];
const ITEMS_PER_PAGE = 6;

function Scholarships() {
  const [gender,   setGender]   = useState("All");
  const [category, setCategory] = useState("All");
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(1);

  const filtered = scholarshipsData.filter(s => {
    const matchGender   = gender   === "All" || s.gender   === "All" || s.gender   === gender;
    const matchCategory = category === "All" || s.category === "All" || s.category === category;
    const matchSearch   = s.name.toLowerCase().includes(search.toLowerCase());
    return matchGender && matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFilter = (setter, value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="scholarship-page">

      <div className="scholarship-header">
        <h1>💰 Scholarship Finder</h1>
        <p>Find scholarships you are eligible for</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search scholarships..."
          value={search}
          onChange={e => handleFilter(setSearch, e.target.value)}
          className="search-input"
        />
        <select value={gender}
          onChange={e => handleFilter(setGender, e.target.value)}
          className="filter-select">
          {genders.map(g => (
            <option key={g} value={g}>
              {g === "All" ? "All Genders" : g}
            </option>
          ))}
        </select>
        <select value={category}
          onChange={e => handleFilter(setCategory, e.target.value)}
          className="filter-select">
          {categories.map(c => (
            <option key={c} value={c}>
              {c === "All" ? "All Categories" : c}
            </option>
          ))}
        </select>
      </div>

      <div className="results-count">
        {filtered.length} scholarships found
      </div>

      <div className="scholarships-list">
        {paginated.map((s, index) => (
          <div key={index} className="scholarship-card">
            <div className="scholarship-left">
              <div className="scholarship-icon">🎓</div>
              <div className="scholarship-info">
                <h3>{s.name}</h3>
                <p className="ministry">By {s.ministry}</p>
                <p className="eligibility">📋 {s.eligibility}</p>
              </div>
            </div>
            <div className="scholarship-right">
              <div className="amount">{s.amount}</div>
              <div className="deadline">📅 Deadline: {s.deadline}</div>
              <div className="tags">
                <span className="stag">
                  {s.gender === "All" ? "All Genders" : s.gender}
                </span>
                <span className="stag">
                  {s.category === "All" ? "General" : s.category}
                </span>
              </div>
              <button className="btn-apply">Apply Now →</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="no-results">
          <p>😕 No scholarships found.</p>
          <p>Try different filters!</p>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            className="page-btn">
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i}
              onClick={() => setPage(i + 1)}
              className={`page-btn ${page === i + 1 ? 'active' : ''}`}>
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className="page-btn">
            Next →
          </button>
        </div>
      )}

    </div>
  );
}

export default Scholarships;
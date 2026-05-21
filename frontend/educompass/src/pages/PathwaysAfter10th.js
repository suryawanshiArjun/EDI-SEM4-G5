import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PathwaysAfter10th.css';

const pathways = {
  engineering: {
    label: 'Engineering',
    icon: '⚙️',
    color: 'teal',
    tagline: 'Build the future with technology',
    stream: 'Science — PCM',
    streamDetail: 'Physics · Chemistry · Maths',
    routes: [
      {
        name: 'Route A — PCM Stream',
        badge: 'Standard',
        badgeColor: 'teal',
        steps: [
          { icon: '📚', title: '11th & 12th Science', sub: 'PCM stream — 2 years' },
          { icon: '✍️', title: 'Entrance Exam', sub: 'JEE Main / MHT-CET / BITSAT' },
          { icon: '🎓', title: 'B.E. / B.Tech', sub: '4-year degree' },
          { icon: '💼', title: 'Career / M.Tech / GATE', sub: 'Placement or higher studies' },
        ],
      },
      {
        name: 'Route B — Diploma (Polytechnic)',
        badge: 'Faster entry',
        badgeColor: 'amber',
        steps: [
          { icon: '🛠️', title: 'Polytechnic Diploma', sub: '3 years directly after 10th' },
          { icon: '🔀', title: 'Lateral Entry', sub: 'Direct to B.E. 2nd year' },
          { icon: '🎓', title: 'B.E. / B.Tech', sub: '3 more years' },
          { icon: '💼', title: 'Career / M.Tech / GATE', sub: 'Placement or higher studies' },
        ],
      },
    ],
    exams: [
      { name: 'JEE Main', scope: 'National', detail: 'NITs, IIITs — Jan & Apr', hot: true },
      { name: 'MHT-CET', scope: 'Maharashtra', detail: 'All MH colleges', hot: true },
      { name: 'JEE Advanced', scope: 'National', detail: 'IITs only — top 2.5L qualifiers', hot: false },
      { name: 'BITSAT', scope: 'National', detail: 'BITS Pilani', hot: false },
    ],
    careers: ['Software Engineer', 'Civil Engineer', 'Mechanical Engineer', 'Data Scientist', 'Govt. (UPSC/PSU)'],
    tip: 'Maharashtra students: MHT-CET alone gets you into all govt & private engineering colleges. JEE gives extra national options.',
    duration: '4–5 years after 12th',
    scholarship: 'Pragati (AICTE) · ₹50,000/yr for girls',
  },
  medical: {
    label: 'Medical / MBBS',
    icon: '🩺',
    color: 'coral',
    tagline: 'Heal lives, save the world',
    stream: 'Science — PCB',
    streamDetail: 'Physics · Chemistry · Biology',
    routes: [
      {
        name: 'Route — PCB → NEET → Degree',
        badge: 'Only path',
        badgeColor: 'coral',
        steps: [
          { icon: '🔬', title: '11th & 12th Science', sub: 'PCB stream — 2 years' },
          { icon: '✍️', title: 'NEET-UG Exam', sub: '720 marks · Once a year (May)' },
          { icon: '🏥', title: 'Choose Degree', sub: 'MBBS / BDS / BAMS / BHMS' },
          { icon: '👨‍⚕️', title: 'Doctor', sub: 'Internship + optional PG' },
        ],
      },
    ],
    exams: [
      { name: 'NEET-UG', scope: 'National', detail: 'Only exam for all medical seats', hot: true },
      { name: 'AIIMS (via NEET)', scope: 'National', detail: 'Top AIIMS through NEET score', hot: true },
      { name: 'MH NEET CAP', scope: 'Maharashtra', detail: 'State counselling after NEET', hot: false },
    ],
    degrees: [
      { name: 'MBBS', years: '5.5 yrs', note: 'Doctor — top choice' },
      { name: 'BDS', years: '5 yrs', note: 'Dentist' },
      { name: 'BAMS', years: '5.5 yrs', note: 'Ayurveda doctor' },
      { name: 'BHMS', years: '5.5 yrs', note: 'Homeopathy doctor' },
    ],
    careers: ['MBBS Doctor', 'Dentist (BDS)', 'Ayurveda (BAMS)', 'Surgeon (MD/MS)', 'Govt. Hospital'],
    tip: 'NEET tip: NCERT Biology (11th + 12th) alone covers 90% of questions. No age limit for NEET after 2023. Unlimited attempts allowed.',
    duration: '5.5 years (MBBS) + optional 3yr PG',
    scholarship: 'INSPIRE · ₹80,000/yr for top science scorers',
  },
  pharmacy: {
    label: 'Pharmacy',
    icon: '💊',
    color: 'purple',
    tagline: 'Science meets healthcare business',
    stream: 'Science — PCB or PCM',
    streamDetail: 'Biology preferred · Chemistry essential',
    routes: [
      {
        name: 'Route A — D.Pharm (Fastest!)',
        badge: '⚡ Direct after 10th',
        badgeColor: 'amber',
        steps: [
          { icon: '💊', title: 'D.Pharm Diploma', sub: '2 years — no 11th/12th needed' },
          { icon: '🏪', title: 'Pharmacy Licence', sub: 'Open own medical store OR…' },
          { icon: '🔀', title: 'Lateral Entry', sub: 'B.Pharm 2nd year — optional' },
          { icon: '🎓', title: 'Career Ready', sub: 'Hospital · Store · Company' },
        ],
      },
      {
        name: 'Route B — Science → B.Pharm',
        badge: 'Full degree',
        badgeColor: 'purple',
        steps: [
          { icon: '📚', title: '11th & 12th Science', sub: 'PCB or PCM — 2 years' },
          { icon: '✍️', title: 'MHT-CET Pharmacy', sub: 'State entrance exam' },
          { icon: '🎓', title: 'B.Pharm', sub: '4-year degree' },
          { icon: '💼', title: 'M.Pharm / Career', sub: 'GPAT for postgrad' },
        ],
      },
    ],
    exams: [
      { name: 'MHT-CET (Pharm)', scope: 'Maharashtra', detail: 'D.Pharm & B.Pharm admissions', hot: true },
      { name: 'GPAT', scope: 'National', detail: 'M.Pharm admissions after B.Pharm', hot: false },
      { name: 'NIPER JEE', scope: 'National', detail: 'Top pharmacy institutes', hot: false },
    ],
    careers: ['Hospital Pharmacist', 'Medical Representative', 'Own Medical Store', 'Drug Inspector (Govt)', 'Pharma Company QC'],
    tip: 'D.Pharm is the only science career you can start directly after 10th. After 2 years you get a PCI licence to open your own medical shop!',
    duration: '2 yrs (D.Pharm) or 4 yrs (B.Pharm)',
    scholarship: 'Panjabrao Deshmukh · NSP Post Matric for SC/ST',
  },
};

const colorMap = {
  teal:   { bg: '#E1F5EE', accent: '#1D9E75', dark: '#085041', badge: '#9FE1CB' },
  coral:  { bg: '#FAECE7', accent: '#D85A30', dark: '#4A1B0C', badge: '#F5C4B3' },
  purple: { bg: '#EEEDFE', accent: '#7F77DD', dark: '#26215C', badge: '#CECBF6' },
  amber:  { bg: '#FAEEDA', accent: '#BA7517', dark: '#412402', badge: '#FAC775' },
};

function AnimatedStep({ step, index, color, visible }) {
  const c = colorMap[color];
  return (
    <div
      className="pathway-step"
      style={{
        animationDelay: `${index * 120}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
      }}
    >
      <div className="step-icon" style={{ background: c.bg, border: `2px solid ${c.badge}` }}>
        {step.icon}
      </div>
      {index < 3 && (
        <div className="step-arrow" style={{ background: c.accent }} />
      )}
      <div className="step-label">
        <div className="step-title">{step.title}</div>
        <div className="step-sub">{step.sub}</div>
      </div>
    </div>
  );
}

function RouteBlock({ route, color, visible }) {
  const c = colorMap[color];
  const badgeC = colorMap[route.badgeColor] || c;
  return (
    <div className="route-block" style={{ borderColor: c.accent + '40' }}>
      <div className="route-header">
        <span className="route-name">{route.name}</span>
        <span
          className="route-badge"
          style={{ background: badgeC.bg, color: badgeC.dark, border: `1px solid ${badgeC.badge}` }}
        >
          {route.badge}
        </span>
      </div>
      <div className="steps-row">
        {route.steps.map((step, i) => (
          <AnimatedStep key={i} step={step} index={i} color={color} visible={visible} />
        ))}
      </div>
    </div>
  );
}

export default function PathwaysAfter10th() {
  const navigate = useNavigate();
  const [active, setActive] = useState('engineering');
  const [visible, setVisible] = useState(false);
  const [prevTab, setPrevTab] = useState('engineering');
  const contentRef = useRef();

  const data = pathways[active];
  const c = colorMap[data.color];

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [active]);

  const handleTab = (key) => {
    if (key === active) return;
    setPrevTab(active);
    setActive(key);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="p10-page">

      {/* HERO */}
      <div className="p10-hero">
        <div className="p10-hero-pill">After 10th Pass — What's Next?</div>
        <h1 className="p10-hero-title">Choose Your Career Path</h1>
        <p className="p10-hero-sub">
          Visual roadmaps to Engineering, Medical &amp; Pharmacy — from 10th to career
        </p>
      </div>

      {/* TABS */}
      <div className="p10-tabs">
        {Object.entries(pathways).map(([key, val]) => {
          const tc = colorMap[val.color];
          return (
            <button
              key={key}
              className={`p10-tab ${active === key ? 'p10-tab-active' : ''}`}
              onClick={() => handleTab(key)}
              style={active === key ? {
                background: tc.bg,
                color: tc.dark,
                borderColor: tc.accent,
                boxShadow: `0 4px 16px ${tc.accent}30`,
              } : {}}
            >
              <span className="tab-icon">{val.icon}</span>
              <span>{val.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="p10-content"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >

        {/* HEADER BANNER */}
        <div className="p10-banner" style={{ background: c.bg, borderColor: c.badge }}>
          <div className="banner-left">
            <div className="banner-icon" style={{ background: c.badge }}>{data.icon}</div>
            <div>
              <h2 className="banner-title" style={{ color: c.dark }}>{data.label}</h2>
              <p className="banner-sub" style={{ color: c.accent }}>{data.tagline}</p>
            </div>
          </div>
          <div className="banner-meta">
            <div className="meta-chip" style={{ background: '#fff', borderColor: c.badge, color: c.dark }}>
              📚 {data.stream}
            </div>
            <div className="meta-chip" style={{ background: '#fff', borderColor: c.badge, color: c.dark }}>
              ⏱️ {data.duration}
            </div>
          </div>
        </div>

        {/* STREAM REQUIRED */}
        <div className="p10-section">
          <div className="section-head">
            <div className="section-dot" style={{ background: c.accent }} />
            <h3 className="section-title">Required Stream (11th &amp; 12th)</h3>
          </div>
          <div className="stream-box" style={{ borderLeft: `4px solid ${c.accent}` }}>
            <span className="stream-name">{data.stream}</span>
            <span className="stream-detail">{data.streamDetail}</span>
          </div>
        </div>

        {/* ROUTES / FLOWCHART */}
        <div className="p10-section">
          <div className="section-head">
            <div className="section-dot" style={{ background: c.accent }} />
            <h3 className="section-title">Roadmap — Step by Step</h3>
          </div>

          {/* START NODE */}
          <div className="flow-start">
            <div className="flow-start-box" style={{ background: c.bg, borderColor: c.accent, color: c.dark }}>
              🏁 10th Pass — Start Here
            </div>
            {data.routes.length > 1 && (
              <div className="flow-fork">
                <div className="fork-line" style={{ background: c.accent }} />
                <div className="fork-line" style={{ background: c.accent }} />
              </div>
            )}
          </div>

          <div className={`routes-container ${data.routes.length === 1 ? 'single-route' : 'dual-route'}`}>
            {data.routes.map((route, i) => (
              <RouteBlock key={i} route={route} color={data.color} visible={visible} />
            ))}
          </div>
        </div>

        {/* DEGREES (medical only) */}
        {data.degrees && (
          <div className="p10-section">
            <div className="section-head">
              <div className="section-dot" style={{ background: c.accent }} />
              <h3 className="section-title">Degree Options via NEET</h3>
            </div>
            <div className="degrees-grid">
              {data.degrees.map((deg, i) => (
                <div
                  key={i}
                  className="degree-card"
                  style={{
                    borderColor: c.badge,
                    animationDelay: `${i * 80}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0.95)',
                    transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`,
                  }}
                >
                  <div className="degree-name" style={{ color: c.dark }}>{deg.name}</div>
                  <div className="degree-years" style={{ background: c.bg, color: c.accent }}>{deg.years}</div>
                  <div className="degree-note">{deg.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENTRANCE EXAMS */}
        <div className="p10-section">
          <div className="section-head">
            <div className="section-dot" style={{ background: c.accent }} />
            <h3 className="section-title">Entrance Exams</h3>
          </div>
          <div className="exams-list">
            {data.exams.map((exam, i) => (
              <div
                key={i}
                className={`exam-row ${exam.hot ? 'exam-hot' : ''}`}
                style={{
                  borderColor: exam.hot ? c.accent : c.badge + '60',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `opacity 0.4s ease ${i * 100}ms, transform 0.4s ease ${i * 100}ms`,
                }}
              >
                <div className="exam-left">
                  {exam.hot && <span className="exam-fire">🔥</span>}
                  <div>
                    <div className="exam-name">{exam.name}</div>
                    <div className="exam-detail">{exam.detail}</div>
                  </div>
                </div>
                <span
                  className="exam-scope"
                  style={{ background: c.bg, color: c.dark, border: `1px solid ${c.badge}` }}
                >
                  {exam.scope}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CAREER OPTIONS */}
        <div className="p10-section">
          <div className="section-head">
            <div className="section-dot" style={{ background: c.accent }} />
            <h3 className="section-title">Career Options After Degree</h3>
          </div>
          <div className="careers-row">
            {data.careers.map((career, i) => (
              <div
                key={i}
                className="career-pill"
                style={{
                  background: c.bg,
                  color: c.dark,
                  borderColor: c.badge,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.35s ease ${i * 70}ms, transform 0.35s ease ${i * 70}ms`,
                }}
              >
                {career}
              </div>
            ))}
          </div>
        </div>

        {/* TIP */}
        <div className="p10-tip" style={{ borderColor: c.accent, background: c.bg }}>
          <span className="tip-icon">💡</span>
          <p style={{ color: c.dark }}>{data.tip}</p>
        </div>

        {/* SCHOLARSHIP + CTA */}
        <div className="p10-footer">
          <div className="schol-chip" style={{ background: c.bg, borderColor: c.badge, color: c.dark }}>
            🎓 {data.scholarship}
          </div>
          <button
            className="cta-btn"
            style={{ background: c.accent, boxShadow: `0 6px 20px ${c.accent}50` }}
            onClick={() => navigate('/scholarships', {
              state: {
                profession:
                  active === 'engineering' ? 'Software Engineer' :
                  active === 'medical'     ? 'Doctor / Healthcare' :
                  'Doctor / Healthcare',
              },
            })}
          >
            View Scholarships for {data.label} →
          </button>
        </div>

      </div>
    </div>
  );
}

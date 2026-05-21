import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const questions = [
  {
    id: 'activity',
    section: 'Section 1: Interests',
    question: 'Which activity do you enjoy the most?',
    options: [
      'Building or fixing things',
      'Reading, writing, or learning',
      'Drawing, designing, or creating',
      'Helping or talking to people',
      'Solving puzzles or coding',
      'Organising or planning things',
    ]
  },
  {
    id: 'subject',
    section: 'Section 1: Interests',
    question: 'Which subject feels easiest or most interesting to you?',
    options: [
      'Mathematics / Physics',
      'Biology / Chemistry',
      'History / Languages',
      'Art / Music / Design',
      'Computer Science / Technology',
      'Business / Economics',
    ]
  },
  {
    id: 'free_time',
    section: 'Section 1: Interests',
    question: 'What do you usually search or watch online in your free time?',
    options: [
      'Tech tutorials or coding',
      'Science documentaries',
      'Business / startups / finance',
      'Art, design, or DIY projects',
      'Social issues or psychology',
      'Sports or fitness content',
    ]
  },
  {
    id: 'problem_vs_create',
    section: 'Section 2: Thinking Style',
    question: 'Do you enjoy solving logical problems or creating new things?',
    options: [
      'Solving logical problems',
      'Creating new things',
      'Both equally',
      'Neither — I prefer routine tasks',
    ]
  },
  {
    id: 'work_type',
    section: 'Section 2: Thinking Style',
    question: 'Which work type do you prefer?',
    options: [
      'Numbers / technology',
      'People / communication',
      'Designs / creativity',
      'Physical / practical work',
    ]
  },
  {
    id: 'lead_vs_solo',
    section: 'Section 2: Thinking Style',
    question: 'Do you prefer leading, collaborating, or working independently?',
    options: [
      'Leading and managing others',
      'Working independently',
      'Collaborating in a small team',
      'A mix of all the above',
    ]
  },
  {
    id: 'natural_skill',
    section: 'Section 3: Skills & Strengths',
    question: 'What are you naturally good at?',
    options: [
      'Explaining or teaching',
      'Analysing data or patterns',
      'Building or coding things',
      'Drawing, writing, or storytelling',
      'Persuading or negotiating',
      'Caring for or counselling others',
    ]
  },
  {
    id: 'proud_achievement',
    section: 'Section 3: Skills & Strengths',
    question: 'What type of achievement or project are you most proud of?',
    options: [
      'A creative project (art, writing, design)',
      'An academic or research project',
      'A technical or engineering project',
      'A business or entrepreneurship project',
      'A sports or fitness achievement',
      'A community or volunteering effort',
    ]
  },
  {
    id: 'praised_for',
    section: 'Section 3: Skills & Strengths',
    question: 'What do others usually praise you for?',
    options: [
      'Being organised and reliable',
      'Being creative and innovative',
      'Being empathetic and supportive',
      'Being logical and analytical',
      'Being persuasive and confident',
      'Being hands-on and resourceful',
    ]
  },
  {
    id: 'consistency',
    section: 'Section 4: Work Habits',
    question: 'Can you stay focused on one thing for a long time?',
    options: [
      'Yes, I thrive with deep focus',
      'Somewhat — I need variety',
      'No, I prefer switching between tasks',
      'It depends on the topic',
    ]
  },
  {
    id: 'when_hard',
    section: 'Section 4: Work Habits',
    question: 'How do you react when work becomes difficult?',
    options: [
      'I push through and research solutions',
      'I ask for help from others',
      'I take a break and come back fresh',
      'I reassess and change my approach',
    ]
  },
  {
    id: 'time_horizon',
    section: 'Section 4: Work Habits',
    question: 'Do you prefer fast results or long-term goals?',
    options: [
      'Fast results — I like quick wins',
      'Long-term goals — I\'m patient',
      'A balance of both',
      'I adapt based on the situation',
    ]
  },
  {
    id: 'work_style',
    section: 'Section 5: Lifestyle Preference',
    question: 'What type of work setup do you prefer?',
    options: [
      'Stable job',
      'Running my own business',
      'Freelancing / flexible work',
      'Remote / flexible work',
    ]
  },
  {
    id: 'desk_vs_field',
    section: 'Section 5: Lifestyle Preference',
    question: 'Do you prefer desk work, field work, or mixed?',
    options: [
      'Desk / office work',
      'Field / outdoor work',
      'A mix of both',
      'Remote / work from anywhere',
    ]
  },
  {
    id: 'values',
    section: 'Section 5: Lifestyle Preference',
    question: 'What matters most to you in a career?',
    options: [
      'High income / financial security',
      'Creative expression',
      'Job stability and benefits',
      'Freedom and independence',
      'Making a difference / helping people',
    ]
  },
  {
    id: 'career_interest',
    section: 'Section 6: Career Awareness',
    question: 'Which career field are you most drawn to?',
    options: [
      'Technology / software / AI',
      'Healthcare / medicine',
      'Business / finance / management',
      'Arts / media / design / entertainment',
      'Engineering / architecture',
      'Education / research / science',
      'Law / government / public service',
      'I have no idea yet',
    ]
  },
  {
    id: 'career_motivation',
    section: 'Section 6: Career Awareness',
    question: 'Why do you want that career?',
    options: [
      'It pays very well',
      'It aligns with my passion',
      'It\'s stable and respected',
      'It lets me be creative or innovative',
      'It lets me help others',
      'I\'m not sure yet',
    ]
  },
  {
    id: 'commitment',
    section: 'Section 6: Career Awareness',
    question: 'Are you willing to invest years of hard work to reach that career?',
    options: [
      'Yes — I\'m fully committed',
      'Yes — but I need guidance',
      'Somewhat — I want an easier path',
      'I\'m still figuring out my goals',
    ]
  },
];

function Quiz() {
  const navigate  = useNavigate();
  const [current, setCurrent]   = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const q = questions[current];
  const progress = Math.round(((current) / questions.length) * 100);

  const handleAnswer = async (option) => {
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Last question — submit to ML model
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:5000/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnswers)
        });
        const data = await response.json();
        if (data.success) {
          navigate('/results', { state: { results: data.top3 } });
        } else {
          setError('Something went wrong. Please try again.');
          setLoading(false);
        }
      } catch (err) {
        setError('Cannot connect to server. Make sure backend is running!');
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="spinner"></div>
        <h2>Analysing your answers...</h2>
        <p>Our AI model is finding your best career matches!</p>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>🎯 Career Quiz</h1>
        <p>Answer honestly — there are no right or wrong answers!</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-wrapper">
        <div className="progress-info">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: progress + '%' }}></div>
        </div>
      </div>

      {/* SECTION LABEL */}
      <div className="section-label">{q.section}</div>

      {/* QUESTION CARD */}
      <div className="question-card">
        <h2 className="question-text">{current + 1}. {q.question}</h2>

        {error && <div className="quiz-error">⚠️ {error}</div>}

        <div className="options-grid">
          {q.options.map((option, i) => (
            <button
              key={i}
              className={`option-btn ${answers[q.id] === option ? 'selected' : ''}`}
              onClick={() => handleAnswer(option)}>
              <span className="option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {current > 0 && (
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const questions = [
  {
    id: 1,
    type: "personal",
    question: "What matters most to you in life?",
    options: [
      { text: "Creating something that never existed before", careers: ["Artist", "Engineer", "Entrepreneur", "Designer"] },
      { text: "Understanding the deepest truths of existence", careers: ["Philosopher", "Scientist", "Researcher", "Writer"] },
      { text: "Achieving physical excellence and discipline", careers: ["Athlete", "Sports Coach", "Army", "Fitness"] },
      { text: "Building wealth and financial independence", careers: ["Business", "Finance", "Entrepreneur"] },
      { text: "Making a real difference in people's lives", careers: ["Doctor", "Social Work", "Civil Services", "Psychologist"] },
      { text: "Being recognized and leaving a lasting mark", careers: ["Politician", "Actor", "Musician", "Filmmaker"] }
    ]
  },
  {
    id: 2,
    type: "personal",
    question: "What can you do for hours without getting bored?",
    options: [
      { text: "Write code, solve puzzles or fix systems", careers: ["Technology", "Engineer", "Scientist"] },
      { text: "Practice a sport, workout or train physically", careers: ["Athlete", "Sports Coach", "Fitness", "Army"] },
      { text: "Read, write, debate or think deeply", careers: ["Philosopher", "Writer", "Lawyer", "Researcher"] },
      { text: "Sketch, design, make music or perform", careers: ["Artist", "Designer", "Musician", "Actor"] },
      { text: "Talk to people, negotiate or build relationships", careers: ["Politician", "Business", "Lawyer", "Social Work"] },
      { text: "Research, experiment or dig into a topic", careers: ["Scientist", "Researcher", "Doctor", "Technology"] }
    ]
  },
  {
    id: 3,
    type: "personal",
    question: "When you imagine your ideal life at 35, what do you see?",
    options: [
      { text: "Leading a company or running my own business", careers: ["Entrepreneur", "Business", "Technology"] },
      { text: "Performing, creating or exhibiting my work", careers: ["Artist", "Musician", "Actor", "Filmmaker"] },
      { text: "Serving the nation in a powerful position", careers: ["Politician", "Civil Services", "Army"] },
      { text: "Doing research or teaching at a university", careers: ["Scientist", "Researcher", "Philosopher", "Teacher"] },
      { text: "Competing at the highest level in my sport", careers: ["Athlete", "Sports Coach", "Fitness"] },
      { text: "Traveling and writing about my experiences", careers: ["Writer", "Filmmaker", "Philosopher", "Designer"] }
    ]
  },
  {
    id: 4,
    type: "scenario",
    question: "You just won a national competition. Which one was it?",
    options: [
      { text: "A coding or science olympiad", careers: ["Technology", "Scientist", "Engineer"] },
      { text: "A state level sports championship", careers: ["Athlete", "Sports Coach", "Fitness"] },
      { text: "A debate or public speaking contest", careers: ["Politician", "Lawyer", "Civil Services"] },
      { text: "A business plan or startup competition", careers: ["Entrepreneur", "Business", "Finance"] },
      { text: "A painting, music or film festival", careers: ["Artist", "Musician", "Filmmaker", "Designer"] },
      { text: "A writing or poetry competition", careers: ["Writer", "Philosopher", "Teacher"] }
    ]
  },
  {
    id: 5,
    type: "scenario",
    question: "A stranger comes to you desperately for help. What kind of help do you give best?",
    options: [
      { text: "Solving a technical or logical problem", careers: ["Technology", "Engineer", "Scientist"] },
      { text: "Emotional support and listening deeply", careers: ["Psychologist", "Doctor", "Social Work"] },
      { text: "Creative advice or design help", careers: ["Artist", "Designer", "Filmmaker"] },
      { text: "Guidance on money or career decisions", careers: ["Finance", "Business", "Entrepreneur"] },
      { text: "Motivating them and giving energy", careers: ["Sports Coach", "Politician", "Teacher"] },
      { text: "Connecting them to the right people", careers: ["Politician", "Business", "Civil Services"] }
    ]
  },
  {
    id: 6,
    type: "technical",
    question: "Which of these skills feel most natural to you?",
    options: [
      { text: "Logical thinking and problem solving", careers: ["Technology", "Engineer", "Scientist", "Finance"] },
      { text: "Physical coordination and stamina", careers: ["Athlete", "Army", "Sports Coach", "Fitness"] },
      { text: "Writing and expressing ideas clearly", careers: ["Writer", "Philosopher", "Lawyer", "Teacher"] },
      { text: "Building and fixing things with hands", careers: ["Engineer", "Designer", "Entrepreneur"] },
      { text: "Reading people and understanding emotions", careers: ["Psychologist", "Doctor", "Social Work", "Politician"] },
      { text: "Spotting patterns and analyzing data", careers: ["Scientist", "Finance", "Technology", "Researcher"] }
    ]
  },
  {
    id: 7,
    type: "technical",
    question: "Which subjects genuinely excited you in school?",
    options: [
      { text: "Maths and Physics", careers: ["Engineer", "Scientist", "Technology", "Finance"] },
      { text: "Biology and Chemistry", careers: ["Doctor", "Scientist", "Researcher", "Fitness"] },
      { text: "History, Geography and Civics", careers: ["Politician", "Civil Services", "Writer", "Philosopher"] },
      { text: "Physical Education and Sports", careers: ["Athlete", "Sports Coach", "Army", "Fitness"] },
      { text: "Art, Music and Literature", careers: ["Artist", "Musician", "Writer", "Filmmaker"] },
      { text: "Economics and Business Studies", careers: ["Business", "Finance", "Entrepreneur", "Lawyer"] }
    ]
  },
  {
    id: 8,
    type: "technical",
    question: "Which tools do you actually enjoy using?",
    options: [
      { text: "Laptop, code editors and tech tools", careers: ["Technology", "Engineer", "Designer"] },
      { text: "Sports equipment and physical gear", careers: ["Athlete", "Sports Coach", "Army", "Fitness"] },
      { text: "Pen, notebook and books", careers: ["Writer", "Philosopher", "Researcher", "Teacher"] },
      { text: "Camera, microphone or instruments", careers: ["Filmmaker", "Musician", "Actor", "Artist"] },
      { text: "Spreadsheets, calculators and data tools", careers: ["Finance", "Business", "Scientist"] },
      { text: "Paintbrush, sketch pad or design software", careers: ["Artist", "Designer", "Filmmaker"] }
    ]
  },
  {
    id: 9,
    type: "technical",
    question: "When you learn something new, how do you prefer to do it?",
    options: [
      { text: "Watch tutorials and experiment yourself", careers: ["Technology", "Engineer", "Entrepreneur"] },
      { text: "Read books and research deeply", careers: ["Philosopher", "Writer", "Scientist", "Researcher"] },
      { text: "Learn by physically doing and practicing", careers: ["Athlete", "Artist", "Army", "Musician"] },
      { text: "Attend workshops and discuss with others", careers: ["Business", "Politician", "Teacher", "Social Work"] },
      { text: "Watch documentaries and real examples", careers: ["Filmmaker", "Researcher", "Civil Services"] },
      { text: "Take structured courses with clear steps", careers: ["Doctor", "Lawyer", "Finance", "Engineer"] }
    ]
  },
  {
    id: 10,
    type: "technical",
    question: "Which of these work tasks would you actually enjoy doing every day?",
    options: [
      { text: "Writing reports, articles or creative content", careers: ["Writer", "Journalist", "Philosopher", "Teacher"] },
      { text: "Analyzing data and finding patterns", careers: ["Scientist", "Finance", "Technology", "Researcher"] },
      { text: "Training, coaching or mentoring people", careers: ["Sports Coach", "Teacher", "Psychologist", "Fitness"] },
      { text: "Building products or developing systems", careers: ["Engineer", "Technology", "Entrepreneur"] },
      { text: "Meeting people and closing deals", careers: ["Business", "Politician", "Lawyer", "Entrepreneur"] },
      { text: "Performing, presenting or entertaining", careers: ["Actor", "Musician", "Filmmaker", "Artist"] }
    ]
  }
];

const careerDetails = {
  "Technology":     { icon: "💻", desc: "Build software, apps and digital solutions that shape the future.", degrees: ["B.Tech CS", "BCA", "B.Sc IT"], salary: "₹6L–₹40L" },
  "Scientist":      { icon: "🔬", desc: "Discover new knowledge and push the boundaries of human understanding.", degrees: ["B.Sc", "M.Sc", "PhD"], salary: "₹5L–₹25L" },
  "Engineer":       { icon: "⚙️", desc: "Design and build systems, structures and machines that solve real problems.", degrees: ["B.Tech", "B.E"], salary: "₹5L–₹30L" },
  "Doctor":         { icon: "⚕️", desc: "Heal patients, save lives and serve society through medicine.", degrees: ["MBBS", "BDS", "BAMS"], salary: "₹8L–₹50L" },
  "Politician":     { icon: "🏛️", desc: "Shape laws, lead people and transform society through governance.", degrees: ["Any degree", "LLB", "BA Political Science"], salary: "Varies" },
  "Philosopher":    { icon: "🧠", desc: "Question reality, seek truth and guide humanity through deep wisdom.", degrees: ["BA Philosophy", "Any degree"], salary: "₹3L–₹20L" },
  "Athlete":        { icon: "🏆", desc: "Excel in sports, represent your nation and inspire millions.", degrees: ["Sports Science", "Physical Education"], salary: "₹2L–₹100L+" },
  "Artist":         { icon: "🎨", desc: "Create visual art and shape culture through creative expression.", degrees: ["BFA", "B.Des"], salary: "₹2L–₹30L" },
  "Writer":         { icon: "✍️", desc: "Tell stories and move people through the power of words.", degrees: ["BA English", "Mass Communication"], salary: "₹3L–₹25L" },
  "Musician":       { icon: "🎵", desc: "Create music and connect with people through sound and rhythm.", degrees: ["B.Music", "Fine Arts"], salary: "₹2L–₹50L+" },
  "Entrepreneur":   { icon: "🚀", desc: "Build businesses, create jobs and solve problems through innovation.", degrees: ["BBA", "MBA", "Any degree"], salary: "Unlimited" },
  "Lawyer":         { icon: "⚖️", desc: "Defend rights, argue cases and uphold justice through law.", degrees: ["LLB", "BA LLB", "BBA LLB"], salary: "₹5L–₹50L" },
  "Civil Services": { icon: "🎖️", desc: "Serve the nation as IAS/IPS and bring change from within the system.", degrees: ["Any graduation + UPSC"], salary: "₹7L–₹20L + perks" },
  "Psychologist":   { icon: "🧘", desc: "Understand the human mind and help people live better lives.", degrees: ["BA/BSc Psychology", "MA Psychology"], salary: "₹4L–₹20L" },
  "Designer":       { icon: "🖌️", desc: "Create beautiful and functional designs for products and brands.", degrees: ["B.Des", "BFA", "Diploma Design"], salary: "₹4L–₹25L" },
  "Actor":          { icon: "🎭", desc: "Perform on stage or screen and move audiences emotionally.", degrees: ["Drama school", "Mass Communication"], salary: "₹2L–₹100L+" },
  "Filmmaker":      { icon: "🎬", desc: "Direct and create films that shape culture and tell powerful stories.", degrees: ["FTII", "Film school", "Mass Communication"], salary: "₹3L–₹50L+" },
  "Social Work":    { icon: "🤝", desc: "Work with communities and uplift the underprivileged.", degrees: ["BSW", "MSW", "BA Sociology"], salary: "₹3L–₹15L" },
  "Finance":        { icon: "📈", desc: "Manage money and financial systems for individuals and corporations.", degrees: ["B.Com", "CA", "MBA Finance"], salary: "₹5L–₹40L" },
  "Business":       { icon: "💼", desc: "Build and run organizations and create value in the marketplace.", degrees: ["BBA", "MBA", "B.Com"], salary: "₹5L–₹50L+" },
  "Researcher":     { icon: "📚", desc: "Conduct deep academic research and contribute new knowledge.", degrees: ["Any B.Sc/BA + PhD"], salary: "₹4L–₹20L" },
  "Teacher":        { icon: "👨‍🏫", desc: "Shape young minds and inspire students to reach their potential.", degrees: ["B.Ed", "Any graduation"], salary: "₹3L–₹15L" },
  "Fitness":        { icon: "💪", desc: "Help people achieve physical health through training and wellness.", degrees: ["Sports Science", "Fitness certification"], salary: "₹3L–₹20L" },
  "Sports Coach":   { icon: "🏅", desc: "Train and mentor athletes to reach their peak performance.", degrees: ["Sports Science", "Physical Education"], salary: "₹3L–₹25L" },
  "Army":           { icon: "🪖", desc: "Serve and protect the nation with courage, discipline and honor.", degrees: ["NDA", "CDS", "Any graduation"], salary: "₹6L–₹20L + perks" },
  "Journalist":     { icon: "📰", desc: "Investigate, report and inform the public about what matters.", degrees: ["Mass Communication", "BA Journalism"], salary: "₹3L–₹20L" },
};

const MIN_SELECT = 2;
const MAX_SELECT = 3;

function calculateResults(answers) {
  const scores = {};

  Object.values(answers).forEach(selectedOptions => {
    selectedOptions.forEach(option => {
      option.careers.forEach(career => {
        scores[career] = (scores[career] || 0) + 1;
      });
    });
  });

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const maxScore = sorted[0]?.[1] || 1;

  return sorted.map(([career, score]) => ({
    career,
    match: Math.round((score / maxScore) * 100),
    ...(careerDetails[career] || {
      icon: "⭐",
      desc: "An exciting career path full of opportunities.",
      degrees: ["Any relevant degree"],
      salary: "Varies"
    })
  }));
}

function Quiz() {
  const navigate   = useNavigate();
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [selected, setSelected] = useState([]);

  const toggleOption = (option) => {
    const alreadySelected = selected.find(
      s => s.text === option.text
    );

    if (alreadySelected) {
      setSelected(selected.filter(s => s.text !== option.text));
    } else {
      if (selected.length < MAX_SELECT) {
        setSelected([...selected, option]);
      }
    }
  };

  const handleNext = () => {
    if (selected.length < MIN_SELECT) return;
    const newAnswers = { ...answers, [current]: selected };
    setAnswers(newAnswers);
    setSelected([]);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const results = calculateResults(newAnswers);
      navigate('/results', { state: { results } });
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1] || []);
    }
  };

  const progress = ((current + 1) / questions.length) * 100;
  const typeLabel = {
    personal: "🧠 Personal",
    scenario: "🎯 Scenario",
    technical: "⚙️ Technical"
  };

  return (
    <div className="quiz-page">

      {/* HEADER */}
      <div className="quiz-header">
        <h1>🎯 EduCompass Quiz</h1>
        <p>Discover your true calling — no limits, no boundaries</p>
      </div>

      {/* PROGRESS */}
      <div className="progress-container">
        <div className="progress-info">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"
               style={{ width: `${progress}%` }}>
          </div>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="question-card">

        {/* TYPE BADGE */}
        <div className="type-badge">
          {typeLabel[questions[current].type]}
        </div>

        <h2>{questions[current].question}</h2>

        {/* INSTRUCTION */}
        <p className="select-instruction">
          Select {MIN_SELECT}–{MAX_SELECT} options
          &nbsp;·&nbsp;
          <span className={selected.length >= MIN_SELECT
            ? 'count-good' : 'count-bad'}>
            {selected.length} selected
          </span>
        </p>

        {/* OPTIONS */}
        <div className="options-grid">
          {questions[current].options.map((option, index) => {
            const isSelected = selected.find(
              s => s.text === option.text
            );
            const isDisabled = !isSelected &&
              selected.length >= MAX_SELECT;

            return (
              <button
                key={index}
                className={`option-btn 
                  ${isSelected ? 'selected' : ''}
                  ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled &&
                  toggleOption(option)}>
                <span className="option-letter">
                  {isSelected ? '✓' : String.fromCharCode(65 + index)}
                </span>
                {option.text}
              </button>
            );
          })}
        </div>

        {/* NAVIGATION */}
        <div className="quiz-navigation">
          <button
            className="btn-back"
            onClick={handleBack}
            disabled={current === 0}>
            ← Back
          </button>
          <button
            className="btn-next"
            onClick={handleNext}
            disabled={selected.length < MIN_SELECT}>
            {selected.length < MIN_SELECT
              ? `Select ${MIN_SELECT - selected.length} more`
              : current + 1 === questions.length
                ? 'See My Results 🎯'
                : 'Next →'}
          </button>
        </div>

      </div>

    </div>
  );
}

export default Quiz;
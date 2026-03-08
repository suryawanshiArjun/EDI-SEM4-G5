const express    = require('express');
const cors       = require('cors');
require('dotenv').config();

const collegesRoute     = require('./routes/colleges');
const careersRoute      = require('./routes/careers');
const scholarshipsRoute = require('./routes/scholarships');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/colleges',     collegesRoute);
app.use('/api/careers',      careersRoute);
app.use('/api/scholarships', scholarshipsRoute);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: '🎉 EduCompass Backend Running!',
    endpoints: [
      'GET /api/colleges',
      'GET /api/careers',
      'GET /api/scholarships'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

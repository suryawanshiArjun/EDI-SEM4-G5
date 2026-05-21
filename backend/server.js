const express    = require('express');
const cors       = require('cors');
require('dotenv').config();

const collegesRoute     = require('./routes/colleges');
const careersRoute      = require('./routes/careers');
const scholarshipsRoute = require('./routes/scholarships');
const predictRoute      = require('./routes/predict');
const predictorRoute    = require('./routes/predictor');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/colleges',     collegesRoute);
app.use('/api/careers',      careersRoute);
app.use('/api/scholarships', scholarshipsRoute);
app.use('/api/predict',      predictRoute);
app.use('/api/predictor',    predictorRoute);

app.get('/', (req, res) => {
  res.json({
    message: '🎉 EduCompass Backend Running!',
    endpoints: [
      'GET /api/colleges',
      'GET /api/careers',
      'GET /api/scholarships',
      'POST /api/predict',
      'GET /api/predictor',
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
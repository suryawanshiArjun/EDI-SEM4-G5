const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const {
      exam_type = 'ENGG',
      percentile = 0,
      category   = 'GOPENS',
      course     = ''
    } = req.query;

    const perc = parseFloat(percentile);

    let query = `
      SELECT 
        college_name,
        course_name,
        college_type,
        category,
        year,
        cap_round,
        MIN(percentile) as cutoff_percentile
      FROM cutoffs
      WHERE exam_type = ?
        AND category  = ?
        AND cap_round = 1
    `;
    const params = [exam_type, category];

    if (course) {
      query += ' AND course_name LIKE ?';
      params.push('%' + course + '%');
    }

    query += `
      GROUP BY college_name, course_name, college_type, category, year, cap_round
      ORDER BY year DESC, cutoff_percentile DESC
    `;

    const [rows] = await db.execute(query, params);

    // Group by college+course, get last 2 years trend
    const grouped = {};
    for (const row of rows) {
      const key = row.college_name + '||' + row.course_name;
      if (!grouped[key]) {
        grouped[key] = {
          college_name:  row.college_name,
          course_name:   row.course_name,
          college_type:  row.college_type,
          category:      row.category,
          cutoffs:       {}
        };
      }
      grouped[key].cutoffs[row.year] = parseFloat(row.cutoff_percentile);
    }

    // Classify each as Safe / Good / Reach / Not Eligible
    const safe    = [];
    const good    = [];
    const reach   = [];

    for (const item of Object.values(grouped)) {
      // Use latest year available
      const years   = Object.keys(item.cutoffs).sort((a, b) => b - a);
      const latest  = parseFloat(item.cutoffs[years[0]]);
      const prev    = years[1] ? parseFloat(item.cutoffs[years[1]]) : latest;
      const trend   = latest > prev ? 'Rising' : latest < prev ? 'Falling' : 'Stable';

      const entry = {
        college_name:  item.college_name,
        course_name:   item.course_name,
        college_type:  item.college_type,
        latest_cutoff: latest,
        cutoffs:       item.cutoffs,
        trend:         trend,
        your_perc:     perc
      };

      const diff = perc - latest;

      if (diff >= 3)       safe.push(entry);
      else if (diff >= -2) good.push(entry);
      else if (diff >= -5) reach.push(entry);
    }

    // Sort each bucket by cutoff descending
    const sortFn = (a, b) => b.latest_cutoff - a.latest_cutoff;
    safe.sort(sortFn);
    good.sort(sortFn);
    reach.sort(sortFn);

    res.json({
      success:    true,
      percentile: perc,
      category:   category,
      exam_type:  exam_type,
      total:      safe.length + good.length + reach.length,
      safe:       safe.slice(0, 30),
      good:       good.slice(0, 30),
      reach:      reach.slice(0, 30)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

// profession → field mapping (matches ML model output)
const professionFields = {
  'Software Engineer':               ['Engineering', 'All Technical', 'All'],
  'Data Scientist':                  ['Engineering', 'All Technical', 'All'],
  'Civil / Mechanical Engineer':     ['Engineering', 'All Technical', 'All'],
  'Doctor / Healthcare':             ['Medical', 'Medical/Nursing', 'Public Health/Medical', 'All'],
  'Scientist / Researcher':          ['Science', 'Science/Research', 'Research', 'All'],
  'Teacher / Educator':              ['All'],
  'Lawyer':                          ['All'],
  'Business Manager / Entrepreneur': ['All'],
  'Financial Analyst / Accountant':  ['All'],
  'Psychologist / Counsellor':       ['Medical', 'All'],
  'Artist / Content Creator':        ['All'],
  'Graphic / UX Designer':           ['Engineering', 'All Technical', 'All'],
};

router.get('/', async (req, res) => {
  try {
    const gender     = req.query.gender     || '';
    const community  = req.query.community  || '';
    const search     = req.query.search     || '';
    const profession = req.query.profession || '';
    const state      = req.query.state      || '';
    const page       = parseInt(req.query.page)  || 1;
    const limit      = parseInt(req.query.limit) || 12;
    const offset     = (page - 1) * limit;

    let query  = 'SELECT * FROM scholarships_new WHERE 1=1';
    let params = [];

    // filter by profession → field
    if (profession && professionFields[profession]) {
      const fields = professionFields[profession];
      const placeholders = fields.map(() => '?').join(', ');
      query += ` AND field IN (${placeholders})`;
      params.push(...fields);
    }

    // filter by gender
    if (gender && gender !== 'All') {
      query += ' AND (gender = ? OR gender = "All")';
      params.push(gender);
    }

    // filter by community
    if (community && community !== 'All') {
      query += ' AND (community = ? OR community = "All")';
      params.push(community);
    }

    // filter by state
    if (state && state !== 'All') {
      query += ' AND (state = ? OR state = "All India")';
      params.push(state);
    }

    // search by name
    if (search) {
      query += ' AND (scholarship_name LIKE ? OR provider LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // count total
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const [countResult] = await db.execute(countQuery, [...params]);
    const total = countResult[0].total;

    // paginate
    query += ` LIMIT ${limit} OFFSET ${offset}`;
    const [scholarships] = await db.execute(query, params);

    res.json({
      success:    true,
      data:       scholarships,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
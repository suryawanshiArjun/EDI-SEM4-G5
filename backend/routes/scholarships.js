const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const gender = req.query.gender || '';
    const search = req.query.search || '';
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let query  = 'SELECT * FROM scholarships WHERE 1=1';
    let params = [];

    if (gender && gender !== 'All') {
      query += ' AND Gender = ?';
      params.push(gender);
    }

    if (search) {
      query += ' AND scholarship_name LIKE ?';
      params.push(`%${search}%`);
    }

    const countQuery = query.replace(
      'SELECT *', 'SELECT COUNT(*) as total'
    );
    const [countResult] = await db.execute(countQuery, [...params]);
    const total = countResult[0].total;

    query += ' LIMIT ' + limit + ' OFFSET ' + offset;

    const [scholarships] = await db.execute(query, params);

    res.json({
      success: true,
      data: scholarships,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
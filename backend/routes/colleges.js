const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const state  = req.query.state  || '';
    const stream = req.query.stream || '';
    const search = req.query.search || '';
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    let query  = 'SELECT * FROM colleges WHERE 1=1';
    let params = [];

    if (state && state !== 'All States') {
      query += ' AND state = ?';
      params.push(state);
    }

    if (stream && stream !== 'All Streams') {
      query += ' AND stream = ?';
      params.push(stream);
    }

    if (search) {
      query += ' AND college_name LIKE ?';
      params.push(`%${search}%`);
    }

    // Count total
    const countQuery = query.replace(
      'SELECT *', 'SELECT COUNT(*) as total'
    );
    const [countResult] = await db.execute(countQuery, [...params]);
    const total = countResult[0].total;

    // Get paginated data
    query += ' LIMIT ' + limit + ' OFFSET ' + offset;

    const [colleges] = await db.execute(query, params);

    res.json({
      success: true,
      data: colleges,
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
const express = require('express');
const router  = express.Router();
const { PythonShell } = require('python-shell');
const path = require('path');

router.post('/', async (req, res) => {
  try {
    const answers = req.body;

    const options = {
      mode: 'text',
      pythonPath: 'python',
      scriptPath: path.join(__dirname, '..'),
      args: [JSON.stringify(answers)]
    };

    PythonShell.run('predict.py', options)
      .then(results => {
        const result = JSON.parse(results[0]);
        res.json({ success: true, ...result });
      })
      .catch(err => {
        res.status(500).json({ success: false, error: err.message });
      });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
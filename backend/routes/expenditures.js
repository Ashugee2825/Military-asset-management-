const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('commander'), async (req, res) => {
  const { base_id, equipment_type, quantity, expend_date } = req.body;

  if (!base_id || !equipment_type || !quantity || !expend_date) {
    return res.status(400).json({ message: 'All fields are required: base_id, equipment_type, quantity, expend_date.' });
  }

  try {
    await db.execute(
      "INSERT INTO expenditures (base_id, equipment_type, quantity, expend_date) VALUES (?, ?, ?, ?)",
      [base_id, equipment_type, quantity, expend_date]
    );
    await db.execute(
      "UPDATE assets SET closing_balance = closing_balance - ? WHERE base_id = ? AND equipment_type = ?",
      [quantity, base_id, equipment_type]
    );
    res.json({ message: 'Expenditure recorded' });
  } catch (error) {
    console.error("Error in expenditures route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;






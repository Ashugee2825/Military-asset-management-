const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('commander'), async (req, res) => {
  const { base_id, equipment_type, quantity, personnel, assign_date } = req.body;

  // Ensure personnel is not undefined
  if (!personnel) {
    return res.status(400).json({ message: 'The "personnel" field is required.' });
  }

  try {
    await db.execute(
      "INSERT INTO assignments (base_id, equipment_type, quantity, personnel, assign_date) VALUES (?, ?, ?, ?, ?)",
      [base_id, equipment_type, quantity, personnel, assign_date]
    );
    await db.execute(
      "UPDATE assets SET closing_balance = closing_balance - ? WHERE base_id = ? AND equipment_type = ?",
      [quantity, base_id, equipment_type]
    );
    res.json({ message: 'Assignment recorded' });
  } catch (error) {
    console.error("Error in assignments route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

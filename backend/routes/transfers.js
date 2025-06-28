const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('logistics'), async (req, res) => {
  const { from_base_id, to_base_id, equipment_type, quantity, transfer_date } = req.body;
  await db.execute("INSERT INTO transfers (from_base_id, to_base_id, equipment_type, quantity, transfer_date) VALUES (?, ?, ?, ?, ?)", [from_base_id, to_base_id, equipment_type, quantity, transfer_date]);
  await db.execute("UPDATE assets SET closing_balance = closing_balance - ? WHERE base_id = ? AND equipment_type = ?", [quantity, from_base_id, equipment_type]);
  await db.execute("UPDATE assets SET closing_balance = closing_balance + ? WHERE base_id = ? AND equipment_type = ?", [quantity, to_base_id, equipment_type]);
  res.json({ message: 'Transfer recorded' });
});

module.exports = router;



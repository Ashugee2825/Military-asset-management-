const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('logistics'), async (req, res) => {
  const { base_id, equipment_type, quantity, purchase_date } = req.body;
  await db.execute("INSERT INTO purchases (base_id, equipment_type, quantity, purchase_date) VALUES (?, ?, ?, ?)", [base_id, equipment_type, quantity, purchase_date]);
  await db.execute("UPDATE assets SET closing_balance = closing_balance + ? WHERE base_id = ? AND equipment_type = ?", [quantity, base_id, equipment_type]);
  res.json({ message: 'Purchase recorded' });
});

router.get('/', auth('admin'), async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM purchases");
  res.json(rows);
});

module.exports = router;

const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth(), async (req, res) => {
  const base_id = req.user.base_id;
  const [openings] = await db.execute("SELECT equipment_type, opening_balance FROM assets WHERE base_id = ?", [base_id]);
  const [purchases] = await db.execute("SELECT equipment_type, SUM(quantity) as total FROM purchases WHERE base_id = ? GROUP BY equipment_type", [base_id]);
  const [transfersIn] = await db.execute("SELECT equipment_type, SUM(quantity) as total FROM transfers WHERE to_base_id = ? GROUP BY equipment_type", [base_id]);
  const [transfersOut] = await db.execute("SELECT equipment_type, SUM(quantity) as total FROM transfers WHERE from_base_id = ? GROUP BY equipment_type", [base_id]);
  const [assigned] = await db.execute("SELECT equipment_type, SUM(quantity) as total FROM assignments WHERE base_id = ? GROUP BY equipment_type", [base_id]);
  const [expended] = await db.execute("SELECT equipment_type, SUM(quantity) as total FROM expenditures WHERE base_id = ? GROUP BY equipment_type", [base_id]);
  res.json({ openings, purchases, transfersIn, transfersOut, assigned, expended });
});

module.exports = router;
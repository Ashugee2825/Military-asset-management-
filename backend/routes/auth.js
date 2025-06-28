const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role, base_id } = req.body;
  
  // Hash the password before storing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.execute(
    "INSERT INTO users (username, password, role, base_id) VALUES (?, ?, ?, ?)",
    [username, hashedPassword, role, base_id]
  );
  
  res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`\n[Login Attempt] for user: ${username}`);
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);

  if (!rows.length) {
    console.log('[Login Result] User not found.');
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const user = rows[0];
  console.log('[Login Result] User found in DB:', { id: user.id, username: user.username, role: user.role });
  console.log('[Login Result] DB Hash:', user.password);

  const valid = await bcrypt.compare(password, user.password);
  console.log('[Login Result] Password validation result:', valid);

  if (!valid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role, base_id: user.base_id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;

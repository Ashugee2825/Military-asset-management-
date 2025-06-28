const jwt = require('jsonwebtoken');
module.exports = function (role = null) {
  return function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      if (role && verified.role !== role && verified.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
};
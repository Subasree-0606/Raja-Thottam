const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.userId = payload.id;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

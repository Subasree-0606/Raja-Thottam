const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.userId).select('isAdmin');
    if (!user || !user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
    next();
  } catch (e) {
    return res.status(403).json({ error: 'Forbidden' });
  }
};

const jwt = require('jsonwebtoken');

module.exports = function authenticateJwt(req, res, next) {
  const token = req.cookies && req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}; 
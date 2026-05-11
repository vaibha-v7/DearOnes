       const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Check cookie first, then fallback to header
  let token = req.cookies && req.cookies.token;

  if (!token) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const tokenParts = authHeader.split(' ');
      token = tokenParts.length === 2 && tokenParts[0] === 'Bearer' ? tokenParts[1] : authHeader;
    }
  }

  if (!token) return res.status(403).json({ status: 'failed', message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ status: 'failed', message: 'Unauthorized.' });
    req.userId = decoded.id;
    next();
  });
};

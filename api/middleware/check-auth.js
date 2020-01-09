const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')[1];

    // Verify if token matches
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    
    // Continue with next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
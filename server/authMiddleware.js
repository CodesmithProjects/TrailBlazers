// authMiddleware.js

const authenticateUser = (req, res, next) => {
  console.log('authenticate user middleware')
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

module.exports = authenticateUser;
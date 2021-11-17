const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('--password');

      next();
    } catch (error) {
      res.status(401).json({ msg: 'Not Authorized, Token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ msg: 'Not Authorized, No token' });
  }
};

const teacher = async (req, res, next) => {
  if (req.user && req.user.isTeacher) {
    next();
  } else {
    res.status(401).json({ msg: 'Not authorized' });
  }
};
module.exports = { protect, teacher };

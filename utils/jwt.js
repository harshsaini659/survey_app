const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};

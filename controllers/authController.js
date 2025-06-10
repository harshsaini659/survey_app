const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, gender, age, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, gender, age, role });

    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({ token, user: { id: user.id, name, email, role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};


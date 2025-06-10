const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Add this line to log the request body
    const { name, email, password, gender, age, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    console.log("existing user",existing)
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword",hashedPassword)
    const user = await User.create({ name, email, password: hashedPassword, gender, age, role });
    console.log("user created",user)
    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({ token, user: { id: user.id, name, email, role } });
  } catch (err) {
    console.error('Signup error:', err); // Add this line
    res.status(500).json({ msg: 'Server error', err: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken({ id: user.id, role: user.role });
    res.status(200).json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server errorrrr', err });
  }
};


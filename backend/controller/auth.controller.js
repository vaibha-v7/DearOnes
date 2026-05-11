const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const generateToken = (user) => {
  const payload = { id: user._id, username: user.username, email: user.email };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ status: 'failed', message: 'username, email and password are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ status: 'failed', message: 'User with given email or username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, totalCards: [] });
    await user.save();

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(201).json({ status: 'successful', token, user: { id: user._id, username: user.username, email: user.email, totalCards: user.totalCards } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'failed', message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: 'failed', message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ status: 'failed', message: 'Invalid credentials' });

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.json({ status: 'successful', token, user: { id: user._id, username: user.username, email: user.email, totalCards: user.totalCards } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('totalCards').select('-password');
    if (!user) return res.status(404).json({ status: 'failed', message: 'User not found' });
    res.json({ status: 'successful', user });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'successful', message: 'Logged out successfully' });
};

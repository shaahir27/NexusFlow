const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (password is hashed in pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// @desc    Demo Login / Seeder
// @route   POST /api/users/demo
// @access  Public
const demoLogin = async (req, res) => {
  try {
    const email = 'evaluator@demo.com';
    let user = await User.findOne({ email });

    if (!user) {
      // Create Demo User
      user = await User.create({
        name: 'Evaluator',
        email,
        password: 'demopassword123!',
      });
    }

    // Force seed tasks if they don't exist
    const Task = require('../models/Task');
    const taskCount = await Task.countDocuments({ user: user._id });
    
    if (taskCount === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      await Task.insertMany([
        {
          user: user._id,
          title: 'Review Task Tracker architecture',
          description: 'Analyze the MERN stack implementation, check authentication flows, and review the codebase.',
          status: 'pending',
          priority: 'high',
          dueDate: tomorrow
        },
        {
          user: user._id,
          title: 'Test UI responsiveness',
          description: 'Open the app on mobile and desktop views to ensure it looks good everywhere.',
          status: 'in_progress',
          priority: 'medium',
          dueDate: today
        },
        {
          user: user._id,
          title: 'Verify MongoDB Connection',
          description: 'Checked if the backend successfully connects to Atlas or local fallback.',
          status: 'completed',
          priority: 'low',
        }
      ]);
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Demo Login Error', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  demoLogin,
};

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials (email or password)',
      });
    }


    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials (email or password)',
      });
    }

    const token = generateToken(user._id);


    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with that email',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token, 
        },
      });
    } else {
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error registering user: ' + error.message,
    });
  }
};
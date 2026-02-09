const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Please provide all required fields' 
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'User already exists with this email' 
            });
        }

        // Create new user
        const newUser = await User.create({
            fullName,
            email,
            password,
            profileImageUrl: profileImageUrl || null
        });

        // Return user data with token
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profileImageUrl: newUser.profileImageUrl,
                token: generateToken(newUser._id)
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error registering user', 
            error: err.message 
        });
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Please provide email and password' 
        });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Return user data with token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error logging in', 
            error: err.message 
        });
    }
};

// @desc    Get user info
// @route   GET /api/v1/auth/me
// @access  Private
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            }
        });
    } catch (err) {
        console.error('Get user info error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching user info', 
            error: err.message 
        });
    }
};

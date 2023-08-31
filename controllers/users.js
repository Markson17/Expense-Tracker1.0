const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
// Load config
dotenv.config({ path: './config/config.env' });

const JWT_SECRET = process.env.JWT_SECRET;


// @desc    Register a user
// @route   POST /users/register
// @access  Public
const registerUser = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const olduser = await User.findOne({ email });

        if (olduser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword
        })
        res.status(201).json({ success: true, data: req.body });
    } catch (error) {
        console.log(error);
        res.send({ status: 'error', message: error });
    }
};

// @desc    Login a user
// @route   POST /users/login
// @access  Public

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'User does not exist' });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, process.env.JWT_SECRET);
        if (res.status(201)) {
            // return res.status(json({ success: true, token: token, data: user });
            return res.status(201).json({ success: true, token: token, data: user });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    }
    res.json({ success: false, message: 'Invalid credentials' });
};

const userDashboard = async (req, res) => {
    const {token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const Useremail = user.email;
        const userdetails = await User.findOne({email: Useremail});
        res.status(201).json({ success: true, data: userdetails });
    } catch (error) {
        console.log(error);
        res.send({ status: 'error', message: error });
    }
}



module.exports = {
    registerUser,
    loginUser,
    userDashboard
}


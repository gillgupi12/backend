const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'okasy this is my damn secret hahaha'


const registerUser = async (req, res) => {
    const { username, email, password, firstName, lastName, dateOfBirth, profilePictureUrl, phoneNumber, address } = req.body
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            passwordHash: password,
            dateOfBirth: dateOfBirth || null,
            profilePictureUrl: profilePictureUrl || '',
            phoneNumber: phoneNumber || null,
        })
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
}

const loginUser = async (req, res) => {
    const { identifier, password } = req.body
    try {
        const existingUser = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        })
        if (!existingUser) {
            res.status(400).json({ message: 'Invalid credentials!' })
        }
        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials!' })
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ token, user: existingUser })
    } catch (err) {
        res.status(500).json({ message: 'Server error' }, err)
    }

}

module.exports = { loginUser, registerUser }




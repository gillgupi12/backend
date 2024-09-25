const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')


const registerUser = async (req, res) => {
    const { userName, email, password, firstName, lastName, dateOfBirth, profilePictureUrl, phoneNumber, address } = req.body
    try {
        const existingUser = await User.findOne({ userName })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser = new User({
            userName,
            email,
            firstName,
            lastName,
            passwordHash: password,
            dateOfBirth: dateOfBirth || null,
            profilePictureUrl: profilePictureUrl || '',
            phoneNumber: phoneNumber || null,
        })
        const user = await User.create(newUser);
        res.status(200).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error', err });
    }
}

const loginUser = async (req, res) => {
    const { userName, password } = req.body
    try {
        const existingUser = await User.findOne({
            $or: [
                { email: userName },
                { userName: userName }
            ]
        })
        if (!existingUser) {
            res.status(400).json({ message: 'Invalid credentials!' })
        }
        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials!' })
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ token, user: existingUser })
    } catch (err) {
        res.status(500).json({ message: 'Server error' }, err)
    }

}

module.exports = { loginUser, registerUser}




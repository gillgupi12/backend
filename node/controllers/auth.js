const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv')



const sendResetEmail = async( email, token) =>{
    console.log(email, token)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
console.log(transporter)
    const url = `http://localhost:4000/api/v1/reset-password/${token}`
    await transporter.sendMail({
        to: email,
        subject: `Password Reset`,
        html: `<p>Click <a href="${url}">here</a> to reset your password</p>`,
    })
}

const registerUser = async (req, res) => {
    const { userName, email, password, firstName, lastName, dateOfBirth, profilePictureUrl, phoneNumber } = req.body
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
            return res.status(400).json({ message: 'Invalid credentials!' })
        }
        const isMatch = await bcrypt.compare(password, existingUser.passwordHash)
        if (!isMatch) {
            return res.status(400).json({ message: 'Password does not match!' })
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token, user: existingUser })
    } catch (err) {
        res.status(500).json({ message: 'Server error', err })
    }

}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body
    try {

        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} doesn't exist!`, err })
        }
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ error: `Current password is incorrect` })
        }
        user.passwordHash = newPassword;
        await user.save()
        res.status(200).json({ message: `Password has been updated successfully!` })

    } catch (err) {
        res.status(400).json({ message: 'Failed to update password', err })
    }
}

const forgotPassword = async (req, res)=>{
    const {email} = req.body

    try{
        const user = await User.findOne({email: email})
        if(!user){
          return  res.status(404).json({message: `User not found`, error: err})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await sendResetEmail(email, token);
        res.send('Reset Email sent!')
    }catch(err){
        res.status(400).json({message: `Server error`, error: err})
    }

}

const resetPassword = async (req, res)=>{
    const { token} = req.params;
    const{ password} = req.body;
    console.log(token, password)
    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({message: `User not found`, error: err})
        }
        console.log(user)
        user.passwordHash = password;
        await user.save();
        res.send('Password has been reset!')
    }catch(err){
        res.status(400).json({message: `Server error`, error: err})
    }

}


module.exports = { loginUser, registerUser, updatePassword, resetPassword, forgotPassword }




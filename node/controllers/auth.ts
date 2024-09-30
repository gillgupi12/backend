import { User } from '../models/User';
import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

const sendResetEmail = async (email: any, token: any) => {
    const transporter = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const url = `http://localhost:4000/api/v1/reset-password/${token}`
    await transporter.sendMail({
        to: email,
        subject: `Password Reset`,
        html: `<p>Click <a href="${url}">here</a> to reset your password</p>`,
    })
}

const registerUser = async (req: Request, res: Response) => {
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

const loginUser = async (req: Request, res: Response) => {
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
        const isMatch = await compare(password, existingUser.passwordHash)
        if (!isMatch) {
            return res.status(400).json({ message: 'Password does not match!' })
        }
        const secret = process.env.JWT_SECRET
        if (!secret) {
           throw new Error('Secret not found!')
        }
        const token = sign({ id: existingUser._id }, secret, { expiresIn: '1h' })
        res.status(200).json({ token, user: existingUser })
    } catch (err) {
        res.status(500).json({ message: 'Server error', err })
    }

}

const updatePassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body
    try {

        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} doesn't exist!` })
        }
        const isMatch = await compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ error: `Current password is incorrect` })
        }
        user.passwordHash = newPassword;
        await user.save()
       return res.status(200).json({ message: `Password has been updated successfully!` })

    } catch (err) {
       return  res.status(400).json({ message: 'Failed to update password', err })
    }
}

const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: `User not found` })
        }
        const secret = process.env.JWT_SECRET;
        if (secret) {
            const token = sign({ id: user._id }, secret, { expiresIn: '1h' });
            await sendResetEmail(email, token);
        }

        res.send('Reset Email sent!')
    } catch (err) {
        res.status(400).json({ message: `Server error`, error: err })
    }

}

const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const secret = process.env.JWT_TOKEN
        if (!secret) {
            throw new Error('secret doesnt exist')
        }
        const decoded = verify(token, secret)
        const user = await User.findById(decoded);
        if (!user) {
            return res.status(404).json({ message: `User not found` })
        }
        user.passwordHash = password;
        await user.save();
        res.send('Password has been reset!')
    } catch (err) {
        res.status(400).json({ message: `Server error`, error: err })
    }

}


export  { loginUser, registerUser, updatePassword, resetPassword, forgotPassword }




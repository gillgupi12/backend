const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')



const getUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select('-passwordHash');

        const count = await User.countDocuments()
        res.status(200).json({
            message: 'Users retrived successfully!',
            users,
            totalUsers: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        })
    } catch (err) {
        res.status(500).json({ message: "Server error", err })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findById(id);
        if (!updatedUser) {
            res.status(400).json({ message: 'User not found!', err })
        }
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: 'Error Occured', err })
    }

}

const updateUser = async (req, res) => {
    const { userID } = req.params;
    const updates = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: userID }, updates, { new: true });
        if (!updatedUser) {
            res.status(400).json({ message: 'User not found!', err })
        }
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: 'Password failed updated', err })
    }

}
const deleteUser = async (req, res) => {
    try {
        const { id: userID } = req.params
        const user = await User.findOneAndDelete({ _id: userID })
        if (!user) {
            res.status(404).json({ msg: `No user found with id: ${userID}` })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}


module.exports = { getUser, getUsers, updateUser, deleteUser }




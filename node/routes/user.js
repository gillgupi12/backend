const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/auth/index')
const {updateUser,  getUsers, getUser, deleteUser} = require('../controllers/user');
const { updatePassword, resetPassword, forgotPassword } = require('../controllers/auth');


router.route('/').get(authMiddleware, getUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/:id/update-password').patch(updatePassword)

module.exports = router


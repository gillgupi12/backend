const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/auth/index')
const {updateUser,  getUsers, getUser, deleteUser} = require('../controllers/user')


router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/').get(authMiddleware, getUsers)

module.exports = router


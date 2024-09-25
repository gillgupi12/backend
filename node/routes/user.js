const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/auth/index')
const {loginUser, registerUser, getUsers} = require('../controllers/user')


router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/users').get(authMiddleware, getUsers)

module.exports = router


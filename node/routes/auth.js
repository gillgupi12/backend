const express = require('express');
const router = express.Router()
const {loginUser, registerUser, forgotPassword, resetPassword} = require('../controllers/auth')


router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)


module.exports = router


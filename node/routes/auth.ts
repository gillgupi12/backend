import express from 'express';
import { loginUser, registerUser, forgotPassword, resetPassword } from '../controllers/auth'

const router = express.Router()

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)


module.exports = router


import express, {Response, Request} from 'express';
const router = express.Router()
import { loginUser, registerUser, forgotPassword, resetPassword } from '../controllers/auth'

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)


module.exports = router


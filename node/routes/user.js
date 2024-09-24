const express = require('express');

const router = express.Router()

const {loginUser, registerUser} = require('../controllers/user')


router.route('/login', loginUser);
router.route('/register', registerUser)


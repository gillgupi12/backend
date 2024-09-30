import express from 'express';
const router = express.Router()

import { updateUser, getUsers, getUser, deleteUser } from '../controllers/user';
import {  updatePassword} from '../controllers/auth'
import authMiddleware from '../middleware/auth';


// router.route('/').get(authMiddleware, getUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
// router.route('/:id/update-password').patch(updatePassword)

export default router


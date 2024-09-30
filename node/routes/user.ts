import express from 'express';
import { updateUser, getUsers, getUser, deleteUser } from '../controllers/user';
import {  updatePassword} from '../controllers/auth'
import authMiddleware from '../middleware/auth';

const router = express.Router()

router.route('/').get(authMiddleware, getUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/:id/update-password').patch(updatePassword)

export default router


import express from 'express';
import { getOrder, getOrders, updateOrder, deleteOrder } from '../controllers/order';
import authMiddleware from '../middleware/auth';

const router = express.Router()

router.route('/').get(authMiddleware, getOrders)
router.route('/:id').get(authMiddleware, getOrder).patch(authMiddleware, updateOrder).delete(authMiddleware, deleteOrder)

export default router


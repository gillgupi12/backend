import { User } from '../models/User'
import { Order } from '../models/Order'
import { Request, Response } from 'express'
require('dotenv')

const getOrder = async (req: Request, res: Response) => {
    try {
        const { userId, orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(400).json({ message: 'ORder not found!' })
        }
        if (order && order.user.id.toString() !== userId) {
            res.status(403).json({ message: 'You do not have permission to access this order.' });
        }
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json({ message: 'Server error', err })
    }
}

const getOrders = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { userId } = req.params;
        const orders = await Order.find({ user: userId }) // Filter by user ID
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const count = await User.countDocuments({ user: userId })
        res.status(200).json({
            message: 'Order retrived successfully!',
            orders,
            totalOrders: count,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: Number(page)
        })
    } catch (err) {
        res.status(500).json({ message: "Server error", err })
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const { orderId, userId } = req.params;
        const updates = req.body
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found!' });
        }

        // Check if the order belongs to the user
        if (order && order.user.id.toString() !== userId) {
            res.status(403).json({ message: 'You do not have permission to update this order.' });
        }
        const updatedOrder = await User.findByIdAndUpdate({ _id: orderId }, updates, { new: true });
        if (!updatedOrder) {
            res.status(400).json({ message: 'Order not found!' })
        }
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(400).json({ message: 'Server error', err })
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { orderId, userId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ msg: `No order found with id: ${orderId}` });
        }

        if (order && order.user.id.toString() !== userId) {
            res.status(403).json({ msg: 'You do not have permission to delete this order.' });
        }
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ order, message: 'Order deleted successfully.' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export { getOrder, getOrders, updateOrder, deleteOrder }




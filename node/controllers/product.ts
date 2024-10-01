import { Product } from '../models/Product'
import {Request, Response} from 'express'

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})

        res.status(200).json({ products })
    } catch (error) {

        res.status(500).json({ msg: error })
    }
}
const getProduct = async (req: Request, res: Response) => {
    try {
        const { id: productId } = req.params
        const product = await Product.findOne({ _id: productId })
        res.status(200).json({ product })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)

        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id: productId } = req.params
        const product = await Product.findByIdAndUpdate(
            { _id: productId },
            req.body, 
            { new: true }
        )
        if (!product) {
            res.status(404).json({ msg: `No product found with id: ${productId}` })
        }
        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id: productId } = req.params
        const product = await Product.findOneAndDelete({ _id: productId })
        if (!product) {
            res.status(404).json({ msg: `No product found with id: ${productId}` })
        }
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export  { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }
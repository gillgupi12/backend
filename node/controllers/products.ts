import { Products } from '../models/Product'
import {Request, Response} from 'express'

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Products.find({})

        res.status(200).json({ products })
    } catch (error) {

        res.status(500).json({ msg: error })
    }
}
const getProduct = async (req: Request, res: Response) => {
    try {
        const { id: productID } = req.params
        const product = await Products.findOne({ _id: productID })
        res.status(200).json({ product })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Products.create(req.body)

        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id: productID } = req.params
        const product = await Products.findByIdAndUpdate(
            { _id: productID },
            req.body, 
            { new: true }
        )
        if (!product) {
            res.status(404).json({ msg: `No product found with id: ${productID}` })
        }
        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id: productID } = req.params
        const product = await Products.findOneAndDelete({ _id: productID })
        if (!product) {
            res.status(404).json({ msg: `No product found with id: ${productID}` })
        }
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export  { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }
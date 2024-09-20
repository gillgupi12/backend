const Products = require('../models/Product')

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({})
        console.log(products)
        res.status(200).json({ products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}
const getProduct = async (req, res) => {
    try {
        const { id: productID } = req.params
        const product = await Products.findOne({ _id: productID })
        res.status(200).json({ product })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body)
        console.log(product)
        res.status(201).json({ product })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateProduct = async (req, res) => {
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

const deleteProduct = async (req, res) => {
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


module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }
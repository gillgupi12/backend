const Brands = require('../models/Brand')

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brands.find({})
        console.log(brands)
        res.status(200).json({ brands })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}
const getBrand = async (req, res) => {
    try {
        const { id: brandID } = req.params
        const brand = await Brands.findOne({ _id: brandID })
        res.status(200).json({ brand })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createBrand = async (req, res) => {
    try {
        const brand = await Brands.create(req.body)
        console.log(brand)
        res.status(201).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateBrand = async (req, res) => {
    try {
        const { id: brandID } = req.params
        const product = await Brands.findByIdAndUpdate(
            { _id: brandID },
            req.body, 
            { new: true }
        )
        if (!product) {
            res.status(404).json({ msg: `No brand found with id: ${brandID}` })
        }
        res.status(201).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteBrand = async (req, res) => {
    try {
        const { id: brandID } = req.params
        const brand = await Brands.findOneAndDelete({ _id: brandID })
        if (!brand) {
            res.status(404).json({ msg: `No brand found with id: ${brandID}` })
        }
        res.status(200).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = { getAllBrands, getBrand, createBrand, updateBrand, deleteBrand }
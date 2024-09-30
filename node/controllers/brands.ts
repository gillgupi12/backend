import { Request, Response } from 'express'
import {Brands} from '../models/Brand'

const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await Brands.find({})
        console.log(brands)
        res.status(200).json({ brands })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}
const getBrand = async (req: Request, res: Response) => {
    try {
        const { id: brandID } = req.params
        const brand = await Brands.findOne({ _id: brandID })
        res.status(200).json({ brand })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createBrand = async (req: Request, res: Response) => {
    try {
        const brand = await Brands.create(req.body)
        console.log(brand)
        res.status(201).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateBrand = async (req: Request, res: Response) => {
    try {
        const { id: brandID } = req.params
        const brand = await Brands.findByIdAndUpdate(
            { _id: brandID },
            req.body, 
            { new: true }
        )
        if (!brand) {
            res.status(404).json({ msg: `No brand found with id: ${brandID}` })
        }
        res.status(201).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteBrand = async (req: Request, res: Response) => {
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


export { getAllBrands, getBrand, createBrand, updateBrand, deleteBrand }
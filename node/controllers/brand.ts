import { Request, Response } from 'express'
import { Brand } from '../models/Brand'

const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await Brand.find({})

        res.status(200).json({ brands })
    } catch (error) {

        res.status(500).json({ msg: error })
    }
}
const getBrand = async (req: Request, res: Response) => {
    try {
        const { id: brandId } = req.params
        const brand = await Brand.findOne({ _id: brandId })
        res.status(200).json({ brand })
    } catch (error) {
        res.status(404).json({ msg: error })
    }
}

const createBrand = async (req: Request, res: Response) => {
    try {
        const brand = await Brand.create(req.body)
        res.status(201).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateBrand = async (req: Request, res: Response) => {
    try {
        const { id: brandId } = req.params
        const brand = await Brand.findByIdAndUpdate(
            { _id: brandId },
            req.body, 
            { new: true }
        )
        if (!brand) {
            res.status(404).json({ msg: `No brand found with id: ${brandId}` })
        }
        res.status(201).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteBrand = async (req: Request, res: Response) => {
    try {
        const { id: brandId } = req.params
        const brand = await Brand.findOneAndDelete({ _id: brandId })
        if (!brand) {
            res.status(404).json({ msg: `No brand found with id: ${brandId}` })
        }
        res.status(200).json({ brand })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


export { getAllBrands, getBrand, createBrand, updateBrand, deleteBrand }
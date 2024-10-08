import express from 'express'
import { createBrand, updateBrand, deleteBrand, getAllBrands, getBrand } from '../controllers/brand'

const router = express.Router()

router.route('/').get(getAllBrands).post(createBrand)
router.route('/:id').get(getBrand).patch(updateBrand).delete(deleteBrand)

export default router
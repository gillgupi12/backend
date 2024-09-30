import express from 'express'

const router = express.Router()

import { createBrand, updateBrand, deleteBrand, getAllBrands, getBrand } from '../controllers/brands'


router.route('/').get(getAllBrands).post(createBrand)
router.route('/:id').get(getBrand).patch(updateBrand).delete(deleteBrand)

module.exports = router
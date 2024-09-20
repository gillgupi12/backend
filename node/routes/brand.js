const express = require('express')

const router = express.Router()

const {createBrand, updateBrand, deleteBrand, getAllBrands, getBrand} = require('../controllers/brands')


router.route('/').get(getAllBrands).post(createBrand)
router.route('/:id').get(getBrand).patch(updateBrand).delete(deleteBrand)

module.exports = router
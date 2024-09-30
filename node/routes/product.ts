import { Router } from 'express'

const router = Router()

import { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/products'

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default router
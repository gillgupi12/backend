import { Router } from 'express'
import { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/products'

const router = Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

export default router
import express from 'express';
import * as ProductController from '../controllers/product.controller';

const router = express.Router();

// Tạo sản phẩm mới
router.post('/', ProductController.createProduct);

// Lấy danh sách sản phẩm
router.get('/', ProductController.getAllProducts);

// Lấy sản phẩm theo ID
router.get('/:productId', ProductController.getProductById);

// Cập nhật sản phẩm
router.put('/:productId', ProductController.updateProduct);

// Xóa sản phẩm
router.delete('/:productId', ProductController.deleteProduct);

export default router;

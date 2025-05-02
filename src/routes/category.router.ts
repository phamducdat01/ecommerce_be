import express from 'express';
import * as CategoryController from '../controllers/category.controller';

const router = express.Router();

// Tạo danh mục mới
router.post('/', CategoryController.createCategory);

// Lấy danh sách danh mục
router.get('/', CategoryController.getAllCategories);

// Lấy danh mục theo ID
router.get('/:categoryId', CategoryController.getCategoryById);

// Cập nhật danh mục
router.put('/:categoryId', CategoryController.updateCategory);

// Xóa danh mục
router.delete('/:categoryId', CategoryController.deleteCategory);

export default router;
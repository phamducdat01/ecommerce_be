import express from 'express';
import * as CartItemController from '../controllers/cartItem.controller';

const router = express.Router();

// Tạo mục giỏ hàng mới
router.post('/', CartItemController.createCartItem);

// Lấy danh sách tất cả mục giỏ hàng
router.get('/', CartItemController.getAllCartItems);

// Lấy mục giỏ hàng theo ID
router.get('/:cartItemId', CartItemController.getCartItemById);

// Lấy danh sách mục giỏ hàng theo userId
router.get('/user/:userId', CartItemController.getCartItemsByUserId);

// Cập nhật mục giỏ hàng
router.put('/:cartItemId', CartItemController.updateCartItem);

// Xóa mục giỏ hàng
router.delete('/:cartItemId', CartItemController.deleteCartItem);

export default router;
import express from 'express';
import * as OrderController from '../controllers/order.controller';

const router = express.Router();

// Tạo đơn hàng mới
router.post('/', OrderController.createOrder);

// Lấy danh sách tất cả đơn hàng
router.get('/', OrderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/:orderId', OrderController.getOrderById);

// Lấy danh sách đơn hàng theo userId
router.get('/user/:userId', OrderController.getOrdersByUserId);

// Cập nhật đơn hàng
router.put('/:orderId', OrderController.updateOrder);

// Xóa đơn hàng
router.delete('/:orderId', OrderController.deleteOrder);

export default router;
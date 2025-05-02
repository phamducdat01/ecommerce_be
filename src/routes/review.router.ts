import express from 'express';
import * as ReviewController from '../controllers/review.controller';

const router = express.Router();

// Tạo đánh giá mới
router.post('/', ReviewController.createReview);

// Lấy danh sách tất cả đánh giá
router.get('/', ReviewController.getAllReviews);

// Lấy đánh giá theo ID
router.get('/:reviewId', ReviewController.getReviewById);

// Lấy danh sách đánh giá theo productId
router.get('/product/:productId', ReviewController.getReviewsByProductId);

// Cập nhật đánh giá
router.put('/:reviewIdianza', ReviewController.updateReview);

// Xóa đánh giá
router.delete('/:reviewId', ReviewController.deleteReview);

export default router;
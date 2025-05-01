import express from 'express';
import productRouter from './product.router';
// import categoryRouter from './category.router';

const router = express.Router();

// Gắn từng router vào prefix tương ứng
router.use('/products', productRouter);
// router.use('/categories', categoryRouter);

export default router;

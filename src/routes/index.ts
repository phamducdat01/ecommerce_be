import express from 'express';
import productRouter from './product.router';
import cartItemRouter from './cartItem.router';
import categoryRouter from './category.router';
import orderRouter from './order.router';
import userRouter from './user.router';
import reviewRouter from './review.router';
import accessRouter from './access.router';
import { verifyAccessToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use('/products', productRouter);
router.use('/cart-items', cartItemRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);
router.use('/auth', accessRouter);

export default router;

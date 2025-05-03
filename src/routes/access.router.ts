import express from 'express';
import * as AccessController from '../controllers/access.controller';

const router = express.Router();

// Đăng ký người dùng mới
router.post('/signup', AccessController.signUp);

// Đăng nhập
router.post('/login', AccessController.login);

// Làm mới token
router.post('/refresh-token', AccessController.handlerRefreshToken);

// Đăng xuất
router.post('/logout', AccessController.logout);

// Quên mật khẩu
router.post('/forgot-password', AccessController.forgotPassword);

// Đặt lại mật khẩu
router.post('/reset-password', AccessController.resetPassword);

export default router;
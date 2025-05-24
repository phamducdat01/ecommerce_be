import express from 'express';
import * as AccessController from '../controllers/access.controller';

const router = express.Router();

/**
 * @openapi
 * /api/auth/sign-up:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Người dùng được tạo thành công
 *       400:
 *         description: Dữ liệu gửi lên không hợp lệ
 */
router.post('/sign-up', AccessController.signUp);

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
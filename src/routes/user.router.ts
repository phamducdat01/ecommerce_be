import express from 'express';
import * as UserController from '../controllers/user.controller';

const router = express.Router();

// Tạo người dùng mới
router.post('/', UserController.createUser);

// Lấy danh sách người dùng
router.get('/', UserController.getAllUsers);

// Lấy người dùng theo ID
router.get('/:userId', UserController.getUserById);

// Cập nhật người dùng
router.put('/:userId', UserController.updateUser);

// Xóa người dùng
router.delete('/:userId', UserController.deleteUser);

export default router;
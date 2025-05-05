import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, AuthFailureError } from '../core/error.response';

// Interface cho payload của JWT
interface JwtPayload {
    userId: string;
    role: string;
}

// Gắn thông tin người dùng vào req
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Kiểm tra header Authorization
        const authHeader = req.headers.authorization;
        console.log('authHeader', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new BadRequestError('Thiếu hoặc sai định dạng header Authorization. Cần dạng Bearer <token>');
        }

        // Trích xuất token
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new BadRequestError('Access token không được cung cấp');
        }

        // Kiểm tra JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET không được định nghĩa trong biến môi trường'); // Lưu ý: Nên thay bằng InternalServerError
        }

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        // Gắn thông tin người dùng vào req
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            throw new AuthFailureError('Access token không hợp lệ hoặc đã hết hạn');
        }
        throw error; // Ném lại các lỗi khác (như BadRequestError hoặc InternalServerError)
    }
};
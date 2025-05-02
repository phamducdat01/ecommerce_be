import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { IUser, UserModel } from '../models/user.model';

// Lưu trữ refresh token trong bộ nhớ (sử dụng Redis hoặc MongoDB trong production)
const refreshTokens: Map<string, string> = new Map();

export const AccessService = {
    // Đăng ký người dùng mới
    signUp: async (userData: Pick<IUser, 'name' | 'email' | 'passwordHash' | 'phone' | 'address' | 'role'>) => {
        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) throw new ConflictRequestError("Email này đã được sử dụng");

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(userData.passwordHash, salt);

        const newUser = await UserModel.create({
            ...userData,
            passwordHash
        });
        if (!newUser) throw new BadRequestError("Lỗi khi tạo người dùng mới");

        // Kiểm tra JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET không được định nghĩa trong biến môi trường");
        }
        // Tạo token
        const accessToken = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' });

        const refreshToken = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Lưu refresh token
        refreshTokens.set(newUser._id.toString(), refreshToken);

        return {
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            accessToken,
            refreshToken
        };
    },

    // Đăng nhập
    login: async (credentials: { email: string; password: string }) => {
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) throw new NotFoundError("Không tìm thấy người dùng");

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isPasswordValid) throw new BadRequestError("Mật khẩu không đúng");

        // Kiểm tra JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET không được định nghĩa trong biến môi trường");
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET không được định nghĩa trong biến môi trường");
        }
        // Tạo token
        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Lưu refresh token
        refreshTokens.set(user._id.toString(), refreshToken);

        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
            refreshToken
        };
    },

    // Xử lý refresh token
    handlerRefreshToken: async (refreshToken: string) => {
        try {
            // Kiểm tra JWT_SECRET
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET không được định nghĩa trong biến môi trường");
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as { userId: string };
            const userId = decoded.userId;

            // Kiểm tra refresh token
            if (!refreshTokens.has(userId) || refreshTokens.get(userId) !== refreshToken) {
                throw new BadRequestError("Refresh token không hợp lệ");
            }

            const user = await UserModel.findById(userId);
            if (!user) throw new NotFoundError("Không tìm thấy người dùng");

            // Tạo access token mới
            const accessToken = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );

            return { accessToken };
        } catch (error) {
            throw new BadRequestError("Refresh token không hợp lệ");
        }
    },

    // Đăng xuất
    logout: async (userId: string) => {
        // Xóa refresh token
        if (refreshTokens.has(userId)) {
            refreshTokens.delete(userId);
            return { message: "Đăng xuất thành công" };
        }
        throw new BadRequestError("Không tìm thấy phiên đăng nhập");
    }
};
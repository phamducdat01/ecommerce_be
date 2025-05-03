import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AuthFailureError, BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { IUser, UserModel } from '../models/user.model';
import { sendMail } from '../helpers/mail.helper';

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

        // Lưu refresh token vào MongoDB
        newUser.refreshToken = refreshToken;
        await newUser.save();


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

        // Lưu refresh token vào MongoDB
        user.refreshToken = refreshToken;
        await user.save();

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

            // Kiểm tra refresh token trong MongoDB
            const user = await UserModel.findOne({ _id: userId, refreshToken });
            if (!user) throw new AuthFailureError("Refresh token không hợp lệ hoặc đã hết hạn");;

            // Tạo access token mới
            const accessToken = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );

            return { accessToken };
        } catch (error) {
            throw new AuthFailureError("Refresh token không hợp lệ hoặc đã hết hạn");
        }
    },

    // Đăng xuất
    logout: async (userId: string) => {
        // Xóa refresh token trong MongoDB
        const user = await UserModel.findById(userId);
        if (user && user.refreshToken) {
            user.refreshToken = undefined;
            await user.save();
            return { message: "Đăng xuất thành công" };
        }
        throw new BadRequestError("Không tìm thấy phiên đăng nhập");
    },

    // Quên mật khẩu
    forgotPassword: async (email: string) => {
        const user = await UserModel.findOne({ email });
        if (!user) throw new NotFoundError("Không tìm thấy người dùng với email này");

        // Tạo mã thông báo đặt lại mật khẩu
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetPasswordExpires = new Date(Date.now() + 3600000); // Hết hạn sau 1 giờ

        // Lưu mã thông báo và thời gian hết hạn vào người dùng
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        // TODO: Gửi email chứa liên kết đặt lại mật khẩu
        // Ví dụ: http://yourdomain.com/reset-password?token=${resetToken}
        // Sử dụng Nodemailer hoặc dịch vụ gửi email khác ở đây
        const resetLink = `http://${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            to: `phamducdat171102dta@gmail.com`,
            subject: "Reset your password",
            html: `Click this link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
        };

        sendMail(mailOptions);

        return { message: "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn", resetLink };
    },

    // Đặt lại mật khẩu
    resetPassword: async (resetToken: string, newPassword: string) => {
        // Băm mã thông báo để so sánh
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        });
        if (!user) throw new BadRequestError("Mã thông báo không hợp lệ hoặc đã hết hạn");

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu và xóa mã thông báo
        user.passwordHash = passwordHash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return { message: "Mật khẩu đã được đặt lại thành công" };
    }
};
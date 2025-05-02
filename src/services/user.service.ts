import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { IUser, UserModel } from '../models/user.model';

export const UserService = {
    // Tạo người dùng mới
    createUser: async (userData: IUser) => {
        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) throw new ConflictRequestError("User with this email already exists");

        const newUser = await UserModel.create(userData);
        if (!newUser) throw new BadRequestError("Create new user error");

        return newUser;
    },

    // Cập nhật người dùng
    updateUser: async (userId: string, updateData: Partial<IUser>) => {
        const user = await UserModel.findById(userId);
        if (!user) throw new NotFoundError("User not found");

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) throw new BadRequestError("Update user error");

        return updatedUser;
    },

    // Xoá người dùng
    deleteUser: async (userId: string) => {
        const user = await UserModel.findById(userId);
        if (!user) throw new NotFoundError("User not found");

        await UserModel.findByIdAndDelete(userId);
        return { message: "User deleted successfully" };
    },

    // Lấy danh sách tất cả người dùng
    getAllUsers: async () => {
        const users = await UserModel.find();
        if (!users || users.length === 0) throw new NotFoundError("No users found");

        return users;
    },

    // Lấy người dùng theo ID
    getUserById: async (userId: string) => {
        const user = await UserModel.findById(userId);
        if (!user) throw new NotFoundError("User not found");

        return user;
    }
};
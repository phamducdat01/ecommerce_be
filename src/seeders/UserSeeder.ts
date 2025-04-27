import { UserModel } from '../models';
import bcrypt from 'bcryptjs';

const fakeUsers = async () => {
    const users = [
        {
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            passwordHash: await bcrypt.hash('password123', 10),
            phone: '0123456789',
            address: 'Hà Nội',
            role: 'customer',
        },
        {
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            passwordHash: await bcrypt.hash('password123', 10),
            phone: '0987654321',
            address: 'Hồ Chí Minh',
            role: 'admin',
        },
    ];

    await UserModel.insertMany(users);
    console.log('Fake users created.');
};

export { fakeUsers };

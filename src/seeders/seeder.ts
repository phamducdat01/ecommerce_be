import mongoose from 'mongoose';
import { fakeUsers } from './UserSeeder';
import { fakeCategories } from './CategorySeeder';
import { fakeProducts } from './ProductSeeder';
import { fakeOrders } from './OrderSeeder';
import { fakeCartItems } from './CartItemSeeder';

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

// Chạy tất cả các Seeder
const runSeeder = async () => {
    await connectDB();

    try {
        // await fakeUsers();
        // await fakeCategories();
        await fakeProducts();
        // await fakeOrders();
        // await fakeCartItems();
        console.log('Seeder completed!');
    } catch (error) {
        console.error('Error running seeder', error);
    } finally {
        mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    }
};

runSeeder();

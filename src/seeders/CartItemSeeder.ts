import { CartItemModel, ProductModel, UserModel } from "../models";


const fakeCartItems = async () => {
    try {
        const users = await UserModel.find();
        const products = await ProductModel.find();

        if (users.length === 0 || products.length === 0) {
            console.log('Không đủ dữ liệu người dùng hoặc sản phẩm để tạo giỏ hàng.');
            return;
        }

        const cartItems = [
            {
                userId: users[0]._id,
                productId: products[0]._id,
                quantity: 2,
            },
            {
                userId: users[1]._id,
                productId: products[1]._id,
                quantity: 1,
            },
        ];

        // Chèn giỏ hàng vào cơ sở dữ liệu
        await CartItemModel.insertMany(cartItems);
        console.log('Fake cart items created.');
    } catch (error) {
        console.error('Error creating fake cart items:', error);
    }
};

export { fakeCartItems };

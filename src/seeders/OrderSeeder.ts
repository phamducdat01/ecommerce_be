import { OrderModel, ProductModel, UserModel } from "../models";


const fakeOrders = async () => {
    const users = await UserModel.find();
    const products = await ProductModel.find();

    const orders = [
        {
            userId: users[0]._id,
            status: 'pending',
            shippingAddress: 'Hà Nội, Việt Nam',
            totalPrice: 30000000,
            items: [
                {
                    productId: products[0]._id,
                    name: 'iPhone 13',
                    quantity: 1,
                    price: 30000000,
                },
            ],
            paymentMethod: 'cash',
        },
        {
            userId: users[1]._id,
            status: 'paid',
            shippingAddress: 'Hồ Chí Minh, Việt Nam',
            totalPrice: 55000000,
            items: [
                {
                    productId: products[1]._id,
                    name: 'MacBook Pro 16',
                    quantity: 1,
                    price: 55000000,
                },
            ],
            paymentMethod: 'bank_transfer',
        },
    ];

    await OrderModel.insertMany(orders);
    console.log('Fake orders created.');
};

export { fakeOrders };

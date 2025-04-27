import { ProductModel, CategoryModel } from '../models';

const fakeProducts = async () => {
    const categories = await CategoryModel.find();

    const products = [
        {
            name: 'iPhone 13',
            slug: 'iphone-13',
            description: 'Điện thoại Apple mới nhất',
            price: 30000000,
            stock: 50,
            categoryId: categories[0]._id,
            thumbnail: 'https://example.com/iphone13.jpg',
            images: ['https://example.com/iphone13_1.jpg', 'https://example.com/iphone13_2.jpg'],
        },
        {
            name: 'MacBook Pro 16',
            slug: 'macbook-pro-16',
            description: 'Laptop Apple cao cấp',
            price: 55000000,
            stock: 20,
            categoryId: categories[1]._id,
            thumbnail: 'https://example.com/macbookpro16.jpg',
            images: ['https://example.com/macbookpro16_1.jpg', 'https://example.com/macbookpro16_2.jpg'],
        },
    ];

    await ProductModel.insertMany(products);
    console.log('Fake products created.');
};

export { fakeProducts };

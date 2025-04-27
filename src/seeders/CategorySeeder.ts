import { CategoryModel } from '../models';

const fakeCategories = async () => {
    const categories = [
        { name: 'Điện thoại', slug: 'dien-thoai' },
        { name: 'Laptop', slug: 'laptop' },
        { name: 'Phụ kiện', slug: 'phu-kien', parentId: null },
    ];

    await CategoryModel.insertMany(categories);
    console.log('Fake categories created.');
};

export { fakeCategories };

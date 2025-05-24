
import mongoose from 'mongoose';
import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { CategoryModel } from '../models';
import { ProductModel } from '../models/product.model';
import { IProduct } from '../models/product.model';

export const ProductService = {
    // Tạo sản phẩm mới
    createProduct: async (productData: IProduct) => {
        const existingProduct = await ProductModel.findOne({ slug: productData.slug });
        if (existingProduct) throw new ConflictRequestError("Product with this slug already exists");

        const newProduct = await ProductModel.create(productData);
        if (!newProduct) throw new BadRequestError("Create new Product error");

        return newProduct;
    },

    // Cập nhật sản phẩm
    updateProduct: async (productId: string, updateData: Partial<IProduct>) => {
        const product = await ProductModel.findById(productId);
        if (!product) throw new NotFoundError("Product not found");

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) throw new BadRequestError("Update product error");

        return updatedProduct;
    },

    // Xoá sản phẩm
    deleteProduct: async (productId: string) => {
        const product = await ProductModel.findById(productId);
        if (!product) throw new NotFoundError("Product not found");

        await ProductModel.findByIdAndDelete(productId);
        return { message: "Product deleted successfully" };
    },

    // Lấy danh sách tất cả sản phẩm
    getAllProducts: async (query: { page?: number; category?: string }) => {
        const { page = 1, category } = query;
        const skip = (page - 1) * 10;

        const filter: any = {};
        if (category) {
            // Tìm danh mục theo slug
            const categoryDoc = await CategoryModel.findOne({ slug: category });
            if (!categoryDoc) throw new NotFoundError('Danh mục không tồn tại');

            // Tìm tất cả danh mục con (bao gồm danh mục chính)
            const categoryIds = [categoryDoc._id];
            const findSubCategories = async (parentId: mongoose.Types.ObjectId) => {
                const subCategories = await CategoryModel.find({ parentId }).lean();
                for (const subCat of subCategories) {
                    categoryIds.push(subCat._id);
                    await findSubCategories(subCat._id);
                }
            };
            await findSubCategories(categoryDoc._id);

            // Lọc sản phẩm thuộc danh mục chính hoặc danh mục con
            filter.categoryId = { $in: categoryIds };
        }


        const [products, total] = await Promise.all([
            ProductModel.find(filter)
                // .populate('categoryId', 'name slug')
                .skip(skip)
                .limit(10)
                .lean(),
            ProductModel.countDocuments(filter)
        ]);

        return {
            products: !products ? products : products.map((item) => {
                const { images, stock, categoryId, ...product } = item;
                return product
            }),
            total
        }
    },

    // Lấy sản phẩm theo ID
    getProductById: async (productId: string) => {
        const product = await ProductModel.findById(productId);
        if (!product) throw new NotFoundError("Product not found");

        return product;
    }
};


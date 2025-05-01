
import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
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
    getAllProducts: async () => {
        const products = await ProductModel.find();
        if (!products || products.length === 0) throw new NotFoundError("No products found");

        return products;
    },

    // Lấy sản phẩm theo ID
    getProductById: async (productId: string) => {
        const product = await ProductModel.findById(productId);
        if (!product) throw new NotFoundError("Product not found");

        return product;
    }
};


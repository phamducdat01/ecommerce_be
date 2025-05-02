import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { CategoryModel, ICategory } from '../models/category.model';

export const CategoryService = {
    // Tạo danh mục mới
    createCategory: async (categoryData: ICategory) => {
        const existingCategory = await CategoryModel.findOne({ slug: categoryData.slug });
        if (existingCategory) throw new ConflictRequestError("Category with this slug already exists");

        const newCategory = await CategoryModel.create(categoryData);
        if (!newCategory) throw new BadRequestError("Create new category error");

        return newCategory;
    },

    // Cập nhật danh mục
    updateCategory: async (categoryId: string, updateData: Partial<ICategory>) => {
        const category = await CategoryModel.findById(categoryId);
        if (!category) throw new NotFoundError("Category not found");

        const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, updateData, { new: true });
        if (!updatedCategory) throw new BadRequestError("Update category error");

        return updatedCategory;
    },

    // Xoá danh mục
    deleteCategory: async (categoryId: string) => {
        const category = await CategoryModel.findById(categoryId);
        if (!category) throw new NotFoundError("Category not found");

        await CategoryModel.findByIdAndDelete(categoryId);
        return { message: "Category deleted successfully" };
    },

    // Lấy danh sách tất cả danh mục
    getAllCategories: async () => {
        const categories = await CategoryModel.find();
        if (!categories || categories.length === 0) throw new NotFoundError("No categories found");

        return categories;
    },

    // Lấy danh mục theo ID
    getCategoryById: async (categoryId: string) => {
        const category = await CategoryModel.findById(categoryId);
        if (!category) throw new NotFoundError("Category not found");

        return category;
    }
};
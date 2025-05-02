import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { CREATED, OK } from '../core/success.response';

export const createCategory = async (req: Request, res: Response) => {
    new CREATED({
        message: "Create new category success!",
        metadata: await CategoryService.createCategory(req.body)
    }).send(res);
};

export const getAllCategories = async (_req: Request, res: Response) => {
    new OK({
        message: "Get all categories success!",
        metadata: await CategoryService.getAllCategories()
    }).send(res);
};

export const getCategoryById = async (req: Request, res: Response) => {
    new OK({
        message: "Get category by ID success!",
        metadata: await CategoryService.getCategoryById(req.params.categoryId)
    }).send(res);
};

export const updateCategory = async (req: Request, res: Response) => {
    new OK({
        message: "Update category success!",
        metadata: await CategoryService.updateCategory(req.params.categoryId, req.body)
    }).send(res);
};

export const deleteCategory = async (req: Request, res: Response) => {
    new OK({
        message: "Delete category success!",
        metadata: await CategoryService.deleteCategory(req.params.categoryId)
    }).send(res);
};

import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { CREATED, OK } from '../core/success.response';

export const createProduct = async (req: Request, res: Response) => {
    new CREATED({
        message: "Create new Product success!",
        metadata: await ProductService.createProduct(req.body)
    }).send(res);
};

export const getAllProducts = async (req: Request, res: Response) => {
    // Lấy query parameters
    const { page, category } = req.query;
    // Chuyển đổi và xác thực params
    const query = {
        page: page ? parseInt(page as string) : 1,
        category: category as string | undefined
    };

    console.log('query', req.query);
    new OK({
        message: "Get all products success!",
        metadata: await ProductService.getAllProducts(query)
    }).send(res);
};

export const getProductById = async (req: Request, res: Response) => {
    new OK({
        message: "Get product by ID success!",
        metadata: await ProductService.getProductById(req.params.productId)
    }).send(res);
};

export const updateProduct = async (req: Request, res: Response) => {
    new OK({
        message: "Update product success!",
        metadata: await ProductService.updateProduct(req.params.productId, req.body)
    }).send(res);
};

export const deleteProduct = async (req: Request, res: Response) => {
    new OK({
        message: "Delete product success!",
        metadata: await ProductService.deleteProduct(req.params.productId)
    }).send(res);
};


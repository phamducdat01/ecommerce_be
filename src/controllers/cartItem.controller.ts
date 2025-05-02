import { Request, Response } from 'express';
import { CartItemService } from '../services/cartItem.service';
import { CREATED, OK } from '../core/success.response';

export const createCartItem = async (req: Request, res: Response) => {
    new CREATED({
        message: "Create new cart item success!",
        metadata: await CartItemService.createCartItem(req.body)
    }).send(res);
};

export const getAllCartItems = async (_req: Request, res: Response) => {
    new OK({
        message: "Get all cart items success!",
        metadata: await CartItemService.getAllCartItems()
    }).send(res);
};

export const getCartItemById = async (req: Request, res: Response) => {
    new OK({
        message: "Get cart item by ID success!",
        metadata: await CartItemService.getCartItemById(req.params.cartItemId)
    }).send(res);
};

export const getCartItemsByUserId = async (req: Request, res: Response) => {
    new OK({
        message: "Get cart items by user ID success!",
        metadata: await CartItemService.getCartItemsByUserId(req.params.userId)
    }).send(res);
};

export const updateCartItem = async (req: Request, res: Response) => {
    new OK({
        message: "Update cart item success!",
        metadata: await CartItemService.updateCartItem(req.params.cartItemId, req.body)
    }).send(res);
};

export const deleteCartItem = async (req: Request, res: Response) => {
    new OK({
        message: "Delete cart item success!",
        metadata: await CartItemService.deleteCartItem(req.params.cartItemId)
    }).send(res);
};
import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { CREATED, OK } from '../core/success.response';

export const createOrder = async (req: Request, res: Response) => {
    new CREATED({
        message: "Create new order success!",
        metadata: await OrderService.createOrder(req.body)
    }).send(res);
};

export const getAllOrders = async (_req: Request, res: Response) => {
    new OK({
        message: "Get all orders success!",
        metadata: await OrderService.getAllOrders()
    }).send(res);
};

export const getOrderById = async (req: Request, res: Response) => {
    new OK({
        message: "Get order by ID success!",
        metadata: await OrderService.getOrderById(req.params.orderId)
    }).send(res);
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
    new OK({
        message: "Get orders by user ID success!",
        metadata: await OrderService.getOrdersByUserId(req.params.userId)
    }).send(res);
};

export const updateOrder = async (req: Request, res: Response) => {
    new OK({
        message: "Update order success!",
        metadata: await OrderService.updateOrder(req.params.orderId, req.body)
    }).send(res);
};

export const deleteOrder = async (req: Request, res: Response) => {
    new OK({
        message: "Delete order success!",
        metadata: await OrderService.deleteOrder(req.params.orderId)
    }).send(res);
};
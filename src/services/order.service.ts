import { BadRequestError, NotFoundError } from '../core/error.response';
import { IOrder, OrderModel } from '../models/order.model';

export const OrderService = {
    // Tạo đơn hàng mới
    createOrder: async (orderData: IOrder) => {
        const newOrder = await OrderModel.create(orderData);
        if (!newOrder) throw new BadRequestError("Create new order error");

        return newOrder;
    },

    // Cập nhật đơn hàng
    updateOrder: async (orderId: string, updateData: Partial<IOrder>) => {
        const order = await OrderModel.findById(orderId);
        if (!order) throw new NotFoundError("Order not found");

        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });
        if (!updatedOrder) throw new BadRequestError("Update order error");

        return updatedOrder;
    },

    // Xoá đơn hàng
    deleteOrder: async (orderId: string) => {
        const order = await OrderModel.findById(orderId);
        if (!order) throw new NotFoundError("Order not found");

        await OrderModel.findByIdAndDelete(orderId);
        return { message: "Order deleted successfully" };
    },

    // Lấy danh sách tất cả đơn hàng
    getAllOrders: async () => {
        const orders = await OrderModel.find();
        if (!orders || orders.length === 0) throw new NotFoundError("No orders found");

        return orders;
    },

    // Lấy đơn hàng theo ID
    getOrderById: async (orderId: string) => {
        const order = await OrderModel.findById(orderId);
        if (!order) throw new NotFoundError("Order not found");

        return order;
    },

    // Lấy danh sách đơn hàng theo userId
    getOrdersByUserId: async (userId: string) => {
        const orders = await OrderModel.find({ userId });
        if (!orders || orders.length === 0) throw new NotFoundError("No orders found for this user");

        return orders;
    }
};
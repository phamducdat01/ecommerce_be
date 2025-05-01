import { BadRequestError, NotFoundError, ConflictRequestError } from '../core/error.response';
import { CartItemModel, ICartItem } from '../models/cartItem.model';

export const CartItemService = {
    // Thêm sản phẩm vào giỏ hàng
    addCartItem: async (userId: string, productId: string, quantity: number) => {
        const existingCartItem = await CartItemModel.findOne({ userId, productId });
        if (existingCartItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            existingCartItem.quantity += quantity;
            const updatedItem = await existingCartItem.save();
            return updatedItem;
        }

        const newCartItem = new CartItemModel({ userId, productId, quantity });
        await newCartItem.save();
        return newCartItem;
    },

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItem: async (userId: string, productId: string, quantity: number) => {
        const cartItem = await CartItemModel.findOne({ userId, productId });
        if (!cartItem) throw new NotFoundError("Cart item not found");

        cartItem.quantity = quantity;
        const updatedItem = await cartItem.save();
        return updatedItem;
    },

    // Xóa sản phẩm khỏi giỏ hàng
    deleteCartItem: async (userId: string, productId: string) => {
        const cartItem = await CartItemModel.findOne({ userId, productId });
        if (!cartItem) throw new NotFoundError("Cart item not found");

        await cartItem.remove();
        return { message: "Cart item deleted successfully" };
    },

    // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
    getCartItemsByUserId: async (userId: string) => {
        const cartItems = await CartItemModel.find({ userId });
        if (!cartItems || cartItems.length === 0) throw new NotFoundError("No cart items found");

        return cartItems;
    }
};

import { BadRequestError, ConflictRequestError, NotFoundError } from '../core/error.response';
import { CartItemModel, ICartItem } from '../models/cartItem.model';

export const CartItemService = {
    // Tạo mục giỏ hàng mới
    createCartItem: async (cartItemData: ICartItem) => {
        const existingCartItem = await CartItemModel.findOne({
            userId: cartItemData.userId,
            productId: cartItemData.productId
        });
        if (existingCartItem) throw new ConflictRequestError("Cart item for this user and product already exists");

        const newCartItem = await CartItemModel.create(cartItemData);
        if (!newCartItem) throw new BadRequestError("Create new cart item error");

        return newCartItem;
    },

    // Cập nhật mục giỏ hàng
    updateCartItem: async (cartItemId: string, updateData: Partial<ICartItem>) => {
        const cartItem = await CartItemModel.findById(cartItemId);
        if (!cartItem) throw new NotFoundError("Cart item not found");

        const updatedCartItem = await CartItemModel.findByIdAndUpdate(cartItemId, updateData, { new: true });
        if (!updatedCartItem) throw new BadRequestError("Update cart item error");

        return updatedCartItem;
    },

    // Xoá mục giỏ hàng
    deleteCartItem: async (cartItemId: string) => {
        const cartItem = await CartItemModel.findById(cartItemId);
        if (!cartItem) throw new NotFoundError("Cart item not found");

        await CartItemModel.findByIdAndDelete(cartItemId);
        return { message: "Cart item deleted successfully" };
    },

    // Lấy danh sách tất cả mục giỏ hàng
    getAllCartItems: async () => {
        const cartItems = await CartItemModel.find();
        if (!cartItems || cartItems.length === 0) throw new NotFoundError("No cart items found");

        return cartItems;
    },

    // Lấy mục giỏ hàng theo ID
    getCartItemById: async (cartItemId: string) => {
        const cartItem = await CartItemModel.findById(cartItemId);
        if (!cartItem) throw new NotFoundError("Cart item not found");

        return cartItem;
    },

    // Lấy danh sách mục giỏ hàng theo userId
    getCartItemsByUserId: async (userId: string) => {
        const cartItems = await CartItemModel.find({ userId });
        if (!cartItems || cartItems.length === 0) throw new NotFoundError("No cart items found for this user");

        return cartItems;
    }
};
import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const CartItemSchema = new Schema<ICartItem>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    },
    { timestamps: true }
);

CartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const CartItemModel = mongoose.model<ICartItem>('CartItem', CartItemSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
    shippingAddress: string;
    totalPrice: number;
    items: IOrderItem[];
    paymentMethod: 'cash' | 'bank_transfer';
    createdAt?: Date;
    updatedAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { _id: false }
);

const OrderSchema = new Schema<IOrder>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], default: 'pending' },
        shippingAddress: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        items: { type: [OrderItemSchema], required: true },
        paymentMethod: {
            type: String,
            enum: ['cash', 'bank_transfer'],
            required: true
        },
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

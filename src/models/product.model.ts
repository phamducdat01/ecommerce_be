import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    categoryId: mongoose.Types.ObjectId;
    thumbnail: string;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        thumbnail: { type: String },
        images: [{ type: String }]
    },
    { timestamps: true }
);

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
    parentId?: mongoose.Types.ObjectId | null;
    createdAt?: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);

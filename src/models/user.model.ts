import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    address?: string;
    role: 'customer' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);

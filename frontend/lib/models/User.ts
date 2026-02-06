import mongoose, { Schema, Document, Model } from 'mongoose';

export enum Role {
    DRIVER = 'DRIVER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
}

// 1. Functionally pure data interface
export interface IUserData {
    name?: string;
    email: string;
    password?: string;
    image?: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

// 2. Document interface
export interface IUser extends IUserData, Document { }

const UserSchema = new Schema<IUser>(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.DRIVER,
        },
    },
    { timestamps: true }
);

export const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

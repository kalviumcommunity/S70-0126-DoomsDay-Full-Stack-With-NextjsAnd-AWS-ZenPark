import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Functionally pure data interface
export interface IFileData {
    name: string;
    url: string;
    size?: number;
    type?: string;
    userId?: mongoose.Types.ObjectId;
    createdAt: Date;
}

// 2. Document interface
export interface IFile extends IFileData, Document { }

const FileSchema = new Schema<IFile>({
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number },
    type: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const File: Model<IFile> =
    mongoose.models.File || mongoose.model<IFile>('File', FileSchema);

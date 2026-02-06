import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Functionally pure data interface
export interface ISiteData {
    name: string;
    address: string;
}

// 2. Document interface
export interface ISite extends ISiteData, Document { }

const SiteSchema = new Schema<ISite>({
    name: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

export const Site: Model<ISite> =
    mongoose.models.Site || mongoose.model<ISite>('Site', SiteSchema);

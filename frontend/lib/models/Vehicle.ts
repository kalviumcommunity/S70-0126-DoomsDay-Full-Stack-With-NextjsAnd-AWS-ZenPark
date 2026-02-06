import mongoose, { Schema, Document, Model } from 'mongoose';

export enum Size {
    COMPACT = 'COMPACT',
    STANDARD = 'STANDARD',
    LARGE = 'LARGE',
}

// 1. Functionally pure data interface (No mongoose methods)
export interface IVehicleData {
    plate: string;
    vehicleModel?: string;
    size: Size;
    userId: mongoose.Types.ObjectId;
}

// 2. Document interface (Data + Mongoose methods like .save())
export interface IVehicle extends IVehicleData, Document { }

const VehicleSchema = new Schema<IVehicle>({
    plate: { type: String, required: true, unique: true },
    vehicleModel: { type: String },
    size: {
        type: String,
        enum: Object.values(Size),
        default: Size.STANDARD,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Vehicle: Model<IVehicle> =
    mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);

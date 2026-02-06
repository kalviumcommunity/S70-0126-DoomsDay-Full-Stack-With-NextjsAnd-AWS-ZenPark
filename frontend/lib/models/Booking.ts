import mongoose, { Schema, Document, Model } from 'mongoose';

export enum BookingStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

// 1. Functionally pure data interface
export interface IBookingData {
    startTime: Date;
    endTime: Date;
    totalPrice: number;
    status: BookingStatus;
    userId: mongoose.Types.ObjectId;
    slotId: mongoose.Types.ObjectId;
    createdAt: Date;
}

// 2. Document interface
export interface IBooking extends IBookingData, Document { }

const BookingSchema = new Schema<IBooking>({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(BookingStatus),
        default: BookingStatus.ACTIVE,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    createdAt: { type: Date, default: Date.now }, // Manually defined, but timestamps also adds createdAt/updatedAt
}, { timestamps: true });

export const Booking: Model<IBooking> =
    mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

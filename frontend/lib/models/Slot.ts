import mongoose, { Schema, Document, Model } from 'mongoose';

export enum SlotType {
    STANDARD = 'STANDARD',
    VIP = 'VIP',
    EV = 'EV',
    HANDICAP = 'HANDICAP',
}

export enum SlotStatus {
    FREE = 'FREE',
    OCCUPIED = 'OCCUPIED',
    RESERVED = 'RESERVED',
    MAINTENANCE = 'MAINTENANCE',
}

// 1. Functionally pure data interface
export interface ISlotData {
    label: string;
    type: SlotType;
    pricePerHour: number;
    status: SlotStatus;
    siteId: mongoose.Types.ObjectId;
    x?: number;
    y?: number;
    rotation?: number;
}

// 2. Document interface
export interface ISlot extends ISlotData, Document { }

const SlotSchema = new Schema<ISlot>({
    label: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(SlotType),
        default: SlotType.STANDARD,
    },
    pricePerHour: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(SlotStatus),
        default: SlotStatus.FREE,
    },
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    x: { type: Number },
    y: { type: Number },
    rotation: { type: Number, default: 0 },
}, { timestamps: true });

export const Slot: Model<ISlot> =
    mongoose.models.Slot || mongoose.model<ISlot>('Slot', SlotSchema);

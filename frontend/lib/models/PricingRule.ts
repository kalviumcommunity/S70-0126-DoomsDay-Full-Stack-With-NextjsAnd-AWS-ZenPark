import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Functionally pure data interface
export interface IPricingRuleData {
    basePrice: number;
    isDynamic: boolean;
    surgeMultiplier: number;
    siteId: mongoose.Types.ObjectId;
}

// 2. Document interface
export interface IPricingRule extends IPricingRuleData, Document { }

const PricingRuleSchema = new Schema<IPricingRule>({
    basePrice: { type: Number, required: true },
    isDynamic: { type: Boolean, default: false },
    surgeMultiplier: { type: Number, default: 1.0 },
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
}, { timestamps: true });

export const PricingRule: Model<IPricingRule> =
    mongoose.models.PricingRule ||
    mongoose.model<IPricingRule>('PricingRule', PricingRuleSchema);

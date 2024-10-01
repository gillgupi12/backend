import { Schema, model, Document } from 'mongoose';

interface IBrand extends Document {
    name: string;
    year: string;
    logo: string;
}

const BrandSchema = new Schema<IBrand>({
    name: { type: String },
    year: { type: String },
    logo: {
        type: String,
        required: false,
    }
})
export const Brand = model<IBrand>('Brand', BrandSchema)
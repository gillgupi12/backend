import  { Schema, model, Document } from 'mongoose';


enum IAvailablity {
    IN_STOCK = 'In Stock',
    OUT_OF_STOCK = 'Out of Stock',
    PRE_ORDER = 'Pre Order'
}

export interface IProduct extends Document {
    title: string;
    description: string;
    images: string[];
    brand: string;
    price: number;
    availability: IAvailablity;
    quantity: number;
}

const ProductSchema = new Schema<IProduct>({
    title: String,
    description: String,
    images: [{ type: String, required: false }],
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: Object.values(IAvailablity),
        default: IAvailablity.IN_STOCK
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true })

export const Product = model<IProduct>('Products', ProductSchema)
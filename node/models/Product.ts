import mongoose, {Schema, model, Document} from 'mongoose';

const ProductSchema = new Schema({
    title: String,
    description: String,
    images: [
        {
            type: String,
            required: false,
        }
    ],
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    availabilty: {
        type: String,
        enum: ['InStock', 'OutOfStock', 'PreOrder'],
        default: 'InStock'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
})

export const Products =  mongoose.model('Products', ProductSchema)
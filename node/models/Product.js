const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Products', ProductSchema)
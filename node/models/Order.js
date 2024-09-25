const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    items: [
        {
            products: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,

            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethods: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})
OrderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();

    // Calculate totalAmount before saving
    this.totalAmount = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    next();
});

OrderSchema.methods.calculateTotalAmount = function () {
    return this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

module.exports = mongoose.model('Order', OrderSchema);


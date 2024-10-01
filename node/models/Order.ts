import { Document, model, Schema } from 'mongoose';
import { IProduct } from './Product';
import { IUser } from './User';

enum IStatus {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}
enum IPaymentMethods {
    CREDIT_CARD = 'Credit Card',
    PAYPAL = 'Paypal',
    BANK_TRANSFER = 'Bank Transfer'
}

interface IItem {
    product: IProduct,
    quantity: number,
    price: number,
}

interface IOrder extends Document {
    items: IItem[],
    totalAmount: number,
    status: IStatus,
    paymentMethods: IPaymentMethods,
    user: IUser;
}

const OrderSchema = new Schema<IOrder>({
    items: [
        {
            products: {
                type: Schema.Types.ObjectId,
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
        enum: Object.values(IStatus),
        default: IStatus.PENDING
    },
    paymentMethods: {
        type: String,
        enum: Object.values(IPaymentMethods),
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

OrderSchema.pre('save', function (next) {
    // Calculate totalAmount before saving
    this.totalAmount = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    next();
});

OrderSchema.methods.calculateTotalAmount = function () {
    return this.items.reduce((total: number, item: { price: number; quantity: number; }) => {
        return total + (item.price * item.quantity);
    }, 0);
};

export const Order = model<IOrder>('Order', OrderSchema);


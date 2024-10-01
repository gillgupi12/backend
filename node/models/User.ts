import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

enum IRole {
    ADMIN = 'admin',
    USER = 'user'
}

interface IAddress {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
}
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    dateOfBirth: Date,
    profilePictureUrl: string;
    phoneNumber: number;
    address: IAddress;
    passwordHash: string;
    createdAt: Date;
    isActive: boolean;
    isVerified: boolean;
    updatedAt: Date;
    lastLogin: Date;
    role: IRole;
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String },
    lastName: { type: String },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    dateOfBirth: { type: Date },
    profilePictureUrl: { type: String },
    phoneNumber: { type: Number },
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
    },
    passwordHash: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    role: { type: String, enum: Object.values(IRole), default: IRole.USER }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next();
});

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.passwordHash);
};
UserSchema.methods.deactivateUser = async function () {
    this.isActive = false;
    await this.save();
    return this;
};

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.passwordHash; // Remove the password field
        return ret;
    }
});

export const User = model<IUser>('User', UserSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
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
    dateOfBirth: {type: Date },
    profilePictureUrl: {type: String},
    phoneNumber: {type: Number},
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
    },
    passwordHash: {type: String, required: true},
    createdAt: { type: Date, default: Date.now() },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now() },
    lastLogin: {type: Date}
})

UserSchema.pre('save', async function(next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next();
});

UserSchema.methods.comparePassword = function(password) {
    return  bcrypt.compare(password, this.passwordHash);
};

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.passwordHash; // Remove the password field
        return ret;
    }
});

module.exports = mongoose.model('User', UserSchema)
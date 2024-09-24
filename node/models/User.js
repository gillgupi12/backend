const mongoose = require('mongose');
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
    updatedAt: { type: Date.now(), default: Date.now() },
    lastLogin: {type: Date}
})

userSchema.pre('save', async function(next) {
    if (this.isModified('passwordHash')) {
        this.password_hash = await bcrypt.hash(this.password_hash, 10);
    }
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.passwordHash);
};


module.exports = mongoose.model('User', UserSchema)
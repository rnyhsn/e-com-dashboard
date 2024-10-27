import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true 
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CUSTOMER'],
        default: 'CUSTOMER'
    }
}, {timestamps: true});


export const User = mongoose?.models.User || mongoose.model('User', userSchema);
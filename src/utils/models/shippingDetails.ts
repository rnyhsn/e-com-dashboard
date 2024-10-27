import mongoose from "mongoose";

const shippingDetailsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    customerName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    phone: {
        type: String,
        required: true 
    },
    address: {
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: true 
    },
    zipCode: {
        type: String,
        required: true 
    },
    country: {
        type: String,
        required: true 
    }
}, {timestamps: true});


export const ShippingDetails = mongoose?.models.ShippingDetails || mongoose.model('ShippingDetails');
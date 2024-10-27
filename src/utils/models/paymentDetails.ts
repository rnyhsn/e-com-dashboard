import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true 
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    amount: {
        type: Number,
        required: true 
    },
    paymentMethod: {
        type: String,
        enum: ['CASH', 'ONLINE'],
        required: true 
    },
    paymentStatus: {
        type: String,
        enum: ['PAID', 'UNPAID'],
        required: true 
    }
}, {timestamps: true});

export const PaymentDetails = mongoose?.models.PaymentDetails || mongoose.model('PaymentDetails', paymentDetailsSchema);
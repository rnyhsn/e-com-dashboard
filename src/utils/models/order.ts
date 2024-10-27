import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true 
    },
    totalAmount: {
        type: Number,
        required: true 
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            price: {
                type: Number,
                required: true 
            },
            quantity: {
                type: Number,
                required: true 
            }
        }
    ],
    orderStatus: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'HOLDING', 'SHIPPED', 'DELIVERED', 'CANCELED'],
        default: 'PENDING'
    }
})

export const Order = mongoose?.models.Order || mongoose.model('Order', orderSchema);
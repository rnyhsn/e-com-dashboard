import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true 
    },
    items: [
        {
         productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true 
            },
            price: {
                type: Number,
                required: true 
            }
        }
    ]
}, {timestamps: true})
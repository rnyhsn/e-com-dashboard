import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    shortDesc: {
        type: String, 
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    sellingPrice: {
        type: Number
    },
    stock: {
        type: Number,
        default: 1
    },
    sku: {
        type: String,
        unique: true 
    },
    colors: {
        type: [String]
    },
    sizes: {
        type: [String]
    },
    tags: [String],
    images: {
        type: [String],
        required: true
    },
    images_public_id: {
        type: [String],
        required: true
    }
}, {timestamps: true});


export const Product = mongoose?.models.Product || mongoose.model("Product", productSchema);
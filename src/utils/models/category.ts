import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        required: true 
    },
    image: {
        type: String
    },
    image_public_id: {
        type: String
    }
    // parentCategory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'  // self referencing
    // }
},
{
    timestamps: true
});

export const Category = mongoose?.models.Category || mongoose.model('Category', categorySchema);
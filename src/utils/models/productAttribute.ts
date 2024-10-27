import mongoose, { mongo } from "mongoose";

const productAttributeSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  attributeName: {
    type: String,
    required: true,
  },
  attributeValue: {
    type: String,
    required: true
  }
})

const ProductAttibute = mongoose?.models.ProductAttibute || mongoose.model('ProductAttribute', productAttributeSchema);
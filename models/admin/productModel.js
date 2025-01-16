import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }, // URL to the image stored in S3
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Product = mongoose.model('Product', productSchema);
export default Product;

import s3 from "../../config/aws.js";
import Product from "../../models/admin/productModel.js"
import { uploadToS3 } from "../../services/adminService/s3service.js"

const uploadProductImage = async (imageData, file) => {
    // console.log('imageData', imageData);
    // console.log('file', file);

    try {
        const { title, description, category, } = imageData;

        if (!title || !description || !category || !file) {
            return { success: false, message: 'All fields are required.' };
        }

        const imageUrl = await uploadToS3(file, category);

        // Save product details to MongoDB
        const product = new Product({
            title,
            description,
            category,
            imageUrl,
        });
        await product.save();

        return { success: true, message: 'Product uploaded successfully.', product };

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error.' };
    }
}


const deleteProductImage = async (data) => {
    try {
        const { id } = data;

        const item = await Product.findById(id)

        console.log(item);

        if (!item) {
            return { success: false, message: "Item  not found!" }
        }


        const imageurl = item.imageUrl;
        // console.log(imageUrl);
        const s3Key = imageurl.split("amazonaws.com/")[1].split('?')[0]
        console.log(s3Key);

        const deleteResult = await s3.deleteObject({
            Bucket: 'flipkartclonenaval',
            Key: s3Key
        }).promise()

        console.log('S3 delete result:', deleteResult);

        await Product.findByIdAndDelete(id);

        return { success: true, message: "item deleted successfully" }


    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error.' };

    }
}

const updateProductImage = async (imageData, file, _id) => {
    try {
        const { id } = _id;
        const { title, description, category } = imageData;

        const item = await Product.findById(id);

        if (!item) {
            return { success: false, message: "Item not found!" };
        }

        let newImageUrl = item.imageUrl;
        console.log(newImageUrl);

        if (file) {

            const oldImageKey = item.imageUrl.split("amazonaws.com/")[1].split('?')[0];
            await s3.deleteObject({
                Bucket: 'flipkartclonenaval',
                Key: oldImageKey
            }).promise();

            const uploadResult = await uploadToS3(file, category);
            newImageUrl = uploadResult;

        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                title,
                description,
                category,
                imageUrl: newImageUrl
            },
            { new: true }
        );

        return { success: true, message: "Item updated successfully", data: updatedProduct };

    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, message: 'Server error: ' + error.message };
    }
};

const getProductDetails = async () => {
    try {

        const products = await Product.find();
        // console.log('products', products);

        if (!products) {
            return { success: false, message: "There is no product to show" }
        }

        return { success: true, message: "product Item got successfully", data: products };


    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, message: 'Server error: ' + error.message };
    }
}


const getdetailskidsproduct = async (params) => {
    try {
        const  {category}  = params; // Extract the 'kids' parameter
        console.log("kids", category);
        const cleanedCategory = category.replace(':', '');        
        const products = await Product.find({ category: cleanedCategory }); // Query products by category

        if (!products || products.length === 0) {
            return { success: false, message: "No products found in this category" };
        }

        return { success: true, message: "Products retrieved successfully", data: products };
    } catch (error) {

        console.error("Error fetching products by category:", error);
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
}

export {
    uploadProductImage,
    deleteProductImage,
    updateProductImage,
    getProductDetails,
    getdetailskidsproduct
}
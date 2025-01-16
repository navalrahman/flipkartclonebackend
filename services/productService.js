import Image from "../models/productModel.js";
import Product from "../models/admin/productModel.js"


const getAllProduct = async () => {
    return await Image.find()
}

const getAllToys = async () => {
    return await Image.find()
}

const kidsCategory = async () => {
    try {
        const items = await Product.find({ category: 'Kids' })
        console.log("items", items);

        if (!items) {
            return { success: false, message: "No item found with kids category" }
        }

        return { success: true, message: 'item feteched successfully', data: items }

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error.' };
    }
}

const electronicsCategory = async () => {
    try {
        const items = await Product.find({ category: 'Electronics' })
        // console.log("items", items);

        if (!items) {
            return { success: false, message: "No item found with electronics category" }
        }

        return { success: true, message: 'item feteched successfully', data: items }

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error.' };
    }
}

const headingCategory = async () => {
    try {
        const items = await Product.find({ category: 'Head' })
        // console.log("items", items);

        if (!items) {
            return { success: false, message: "No item found with electronics category" }
        }

        return { success: true, message: 'item feteched successfully', data: items }

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Server error.' };
    }
}
export {
    getAllProduct,
    getAllToys,
    kidsCategory,
    electronicsCategory,
    headingCategory
}
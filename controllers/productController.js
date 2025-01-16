// import Image from "../models/productModel.js";
import { getAllProduct, getAllToys, kidsCategory, electronicsCategory, headingCategory } from "../services/productService.js";


// const getAllProductDetails = async (req, res) => {
//     try {
//         const images = await Image.find();
//         res.json(images);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching images" });
//     }
// }

const getAllProductDetails = async (req, res) => {
    try {
        const images = await getAllProduct();
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images" });
    }
}


// const getAllToysDetails = async(req, res) => {
//     try {
//         const images = await Image.find();
//         res.json(images);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching images" });
//     }
// }

const getAllToysDetails = async (req, res) => {
    try {
        const images = await getAllToys()
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images" });
    }
}


const getKidsCategory = async (req, res) => {
    try {
        const result = await kidsCategory()

        if (result.success === false) {
            return res.status(404).json(result);
        }
        console.log(result);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })
    }
}


const getElectronicsCategory = async (req, res) => {
    try {
        const result = await electronicsCategory()

        if (result.success === false) {
            return res.status(404).json(result);
        }
        // console.log(result);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })
    }
}

const getHeadingCategory = async (req, res) => {
    try {
        const result = await headingCategory()

        if (result.success === false) {
            return res.status(404).json(result);
        }
        // console.log(result);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })
    }
}


export {
    getAllProductDetails,
    getAllToysDetails,
    getKidsCategory,
    getElectronicsCategory,
    getHeadingCategory
} 
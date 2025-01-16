import { deleteProductImage, uploadProductImage, updateProductImage, getProductDetails, getdetailskidsproduct } from "../../services/adminService/productService.js";


const uploadImage = async (req, res) => {
    console.log('user', req.body);
    console.log('user2', req.file);
    
    try {
        const result = await uploadProductImage(req.body, req.file);

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

const deleteImage = async (req, res) => {
    try {
        const result = await deleteProductImage(req.params);

        if (result.success === false) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })

    }
}

const updateImage = async (req, res) => {
    try {
        const result = await updateProductImage(req.body, req.file, req.params);

        if (result.success === false) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })

    }
}

const getDetails = async (req, res) => {
    console.log("something");
    try {
        const result = await getProductDetails();

        if (result.success === false) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })

    }
}

const getDetailsKids = async (req, res) => {
    console.log(req.params);
    
    try {
        const result = await getdetailskidsproduct(req.params);

        if (result.success === false) {
            return res.status(404).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "something went wrong please try again" })

    }
}

export {
    uploadImage,
    deleteImage,
    updateImage,
    getDetails,
    getDetailsKids
}
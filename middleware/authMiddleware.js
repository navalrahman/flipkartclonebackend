import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Admin from "../models/admin/adminModel.js";


const protect = async (req, res, next) => {
    let { authorization } = req.headers
    console.log("tokesssn", req.headers);

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.split(' ')[1];


    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decode", decode);

        req.user = await Admin.findById(decode.userId).select("-password")
        next()

    } catch (error) {
        return res.status(401).send("Not authorized, token not valid")
    }
}

export { protect }

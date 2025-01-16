
import { logout, registerUser, userLogin } from "../services/userService.js";

const createUser = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}


const loginUser = async (req, res) => {
    const result = await userLogin(req.body);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(200).json(result);

};

const logoutUser = async (req, res) => {
    try {
        const message = await logout(res);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export {
    createUser,
    loginUser,
    logoutUser,
    
}
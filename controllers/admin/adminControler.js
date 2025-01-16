import { getAdminLogin, getAdminSingup, logout } from "../../services/adminService/adminService.js"


const adminSignup = async (req, res) => {
    try {

        const result = await getAdminSingup(req.body);

        if (result.success === false) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).send("Serever error");
    }
};


const adminLogin = async (req, res) => {
    try {
        const result = await getAdminLogin(req.body);

        if (result.success === false) {
            return res.status(404).json(result);
        }

        // console.log('result',result);
        console.log(result);

        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serever error")
    }
}

const adminLogout = async (req, res) => {
    try {
        const result = await logout(res);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    adminSignup,
    adminLogin,
    adminLogout
}
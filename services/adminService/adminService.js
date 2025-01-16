import Admin from "../../models/admin/adminModel.js";
import bcrypt from 'bcryptjs'
import { createToken } from "../../utils/createToken.js";


const getAdminSingup = async (admindetails) => {
    try {
        const { name, email, password, role } = admindetails;

        if (!name || !email || !password) {
            return { success: false, message: "All fields are required" };
        };

        const adminExist = await Admin.findOne({ email });

        if (adminExist) {
            return { success: false, message: "Email already used" };
        };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            name,
            email,
            password: hashPassword,
            role
        })

        await newAdmin.save();

        return { suceess: true, message: "Admin created successfully", name }


    } catch (error) {
        console.log(error);
        return { sucess: false, message: "Something went wrong" };
    }
}


const getAdminLogin = async (loginDetails) => {
    try {
        console.log(loginDetails);
        const { email, password } = loginDetails;

        if (!email || !password) {
            return { success: false, message: "All fields are required" };
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return { success: false, message: "invalid email address" };
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid) {
            return { success: false, message: "Password is incorrect" }
        }

        const token = createToken(admin._id, admin.role)

        return {
            success: true,
            message: "Admin Login Successfull",
            name: admin.name,
            token
        }

    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" };
    }

}


const logout = async (response) => {
    try {
        return {success: true, message:'Logged out successfully'};
    } catch (error) {
        console.log(error);
        return { success: false, message: "Something went wrong" };
    }
}


export {
    getAdminSingup,
    getAdminLogin,
    logout
}


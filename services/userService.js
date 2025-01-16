import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { createToken } from "../utils/createToken.js";



const registerUser = async (userDetails) => {
    try {
        const { username, email, password } = userDetails;

        if (!username || !email || !password) {
            throw new Error('Please fill out all details');
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return { error: "User already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        await newUser.save();

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};
const userLogin = async (loginDetails) => {
    try {
        // console.log(loginDetails);
        const { email, password } = loginDetails;

        if (!email || !password) {
            return { error: "All fields must be filled" };
        }

        const user = await User.findOne({ email });

        if (!user) {
            return { error: "User not found!" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { error: "Invalid password!" };
        }

        const token = createToken(user._id);


        return {
            message: "Login successful!",
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
        };
    } catch (error) {
        console.error("Login error:", error.message);
        return { error: "An unexpected error occurred" };
    }
};

const logout = async (response) => {
    try {
        return 'Logged out successfully';
    } catch (error) {
        console.log(error);
    }
}

export {
    registerUser,
    userLogin,
    logout
}
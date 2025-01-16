import jwt from 'jsonwebtoken';

// Function to create a token
const createToken = (userId, userRole) => {
    try {
        const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    } catch (error) {
        console.error("Error creating token:", error.message);
        throw new Error("Token generation failed");
    }
};


export { createToken };

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb Connected");
    } catch (error) {
        console.log("error", error.message);
        process.exit(1);
    }
};

export default connectDB;
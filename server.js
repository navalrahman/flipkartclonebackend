import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.config.js';

import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
// import imageRoutes from './routes/imageRoute.js';


import adminRoutes from './routes/admin/adminRoute.js';
import adminProductRoutes from './routes/admin/productRoute.js';


dotenv.config();

const port = process.env.PORT || 5080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: ['http://localhost:5173', 'http://localhost:5174'] , 
    origin: [
        'http://ec2-51-20-67-178.eu-north-1.compute.amazonaws.com', // Update with your frontend EC2 instance
        'http://ec2-13-60-245-126.eu-north-1.compute.amazonaws.com'  // Another frontend instance, if applicable
    ],
    credentials: true
}));

// app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve images from 'productimages' folder
app.use('/images', express.static(path.join(__dirname, 'productimages')));


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
// app.use('/api', imageRoutes)

// adminroutes

app.use('/api/admin', adminRoutes)
app.use('/api/adminupload', adminProductRoutes)



connectDB();

// import app from "./config/app.js";



// import { port, app } from "./config/app.js";
// const port = process.env.PORT || 5080;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});





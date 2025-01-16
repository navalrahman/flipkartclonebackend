import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.config.js';

import userRoutes from '../routes/userRoute.js';
import productRoutes from '../routes/productRoute.js';

dotenv.config();

const port = process.env.PORT || 5080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: 'http://localhost:5173', 
    // credentials: true 
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve images from 'productimages' folder
app.use('/images', express.static(path.join(__dirname, 'productimages')));


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

connectDB();

export {
    app,
    port
}
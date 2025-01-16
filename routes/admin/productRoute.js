import express from 'express';
import multer from 'multer';
import { deleteImage, updateImage, uploadImage, getDetails, getDetailsKids } from '../../controllers/admin/productuploadController.js';
import { protect } from '../../middleware/authMiddleware.js'

const route = express.Router();
const upload = multer();

route.use(protect);

route.post('/upload', upload.single('file'), uploadImage);
route.delete('/delete/:id', deleteImage);
route.put('/update/:id', upload.single('file'), updateImage);
route.get('/getdetails', getDetails)
route.get('/getdetails/:category', getDetailsKids)

export default route;
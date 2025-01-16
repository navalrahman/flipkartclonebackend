import express from 'express';
import { getAllProductDetails, getAllToysDetails, getKidsCategory, getElectronicsCategory, getHeadingCategory } from '../controllers/productController.js';

const router = express.Router();

router.get('/product_details', getAllProductDetails);
router.get('/toys_details', getAllToysDetails);
router.get('/kidscatergory', getKidsCategory);
router.get('/electronicscategory', getElectronicsCategory);
router.get('/headingcategory', getHeadingCategory);

export default router;
import express from 'express';
import { adminLogin, adminSignup, adminLogout } from '../../controllers/admin/adminControler.js';

const route = express.Router();

route.post('/adminsignup', adminSignup);
route.post('/adminlogin', adminLogin);
route.post('/adminlogout', adminLogout);

export default route;
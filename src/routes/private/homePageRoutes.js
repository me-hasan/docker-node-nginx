import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { bootstrap, buyingPower } from '../../http/controllers/private/homePageController.js';


const homepageRoutes = express.Router();

homepageRoutes.get('/home-page-bootstrap', [authMiddleware], bootstrap);
homepageRoutes.get('/buying-power', [authMiddleware], buyingPower);

export default homepageRoutes;

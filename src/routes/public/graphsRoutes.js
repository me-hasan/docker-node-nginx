import express from 'express';
import { pricePerformance } from '../../http/controllers/private/graphsController.js';


const publicGraphsRoutes = express.Router();


publicGraphsRoutes.get('/price-performance/:timeLabel/:comCode', pricePerformance);


export default publicGraphsRoutes;



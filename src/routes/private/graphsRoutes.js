import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { portfolioInsightSection, portfoliPerformance } from '../../http/controllers/private/graphsController.js';


const graphsRoutes = express.Router();

graphsRoutes.get('/portfolio-insight-section', [authMiddleware], portfolioInsightSection);
graphsRoutes.get('/portfolio-performance/:timeLabel', [authMiddleware], portfoliPerformance);


export default graphsRoutes;

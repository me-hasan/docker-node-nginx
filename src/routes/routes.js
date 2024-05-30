import express from 'express';
import { authMiddleware } from '../http/middleware/authMiddleware.js';
import investorRoutes from './public/investorRoutes.js';
import authRoutes from './public/authRoutes.js';
import profileRoutes from './private/profileRoutes.js';
import homepageRoutes from './private/homePageRoutes.js';
import graphsRoutes from './private/graphsRoutes.js';
import conpanyListRoutes from './public/companyListRoutes.js';
import watchListRoutes from './private/watchListRoutes.js';
import conpanyDetailsRoutes from './public/companyDetailsRoutes.js';
import publicGraphsRoutes from './public/graphsRoutes.js';
import alertRoutes from './private/alertRoutes.js';
import requestFeatureRoutes from './private/requestFeature.js';
import customPortfolioRoutes from './private/customPortfolioRoutes.js';
import newsRoutes from './public/newsRoutes.js';

// Other imports, such as controllers or middleware

const publicRouter = express.Router();
const privateRouter = express.Router();

/**
 * Public routes
 */
publicRouter.use('/investors', investorRoutes);
publicRouter.use('/auth', authRoutes);
publicRouter.use('/', conpanyListRoutes);
publicRouter.use('/', conpanyDetailsRoutes);
publicRouter.use('/', publicGraphsRoutes);
publicRouter.use('/', newsRoutes);


/**
 * Private routes
 */
privateRouter.use(authMiddleware);
privateRouter.use('/profile', profileRoutes);
privateRouter.use('/', homepageRoutes);
privateRouter.use('/', graphsRoutes);
privateRouter.use('/', watchListRoutes);
privateRouter.use('/', alertRoutes);
privateRouter.use('/', requestFeatureRoutes);
privateRouter.use('/', customPortfolioRoutes);

export { publicRouter, privateRouter };

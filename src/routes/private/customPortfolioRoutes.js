import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { createCustomPortfolio, listCustomPortfolio } from '../../http/controllers/private/customPortfolioController.js';


const customPortfolioRoutes = express.Router();

// create custom porfolio 
customPortfolioRoutes.post('/create-custom-portfolio', [authMiddleware], createCustomPortfolio);

//List of portfolio
customPortfolioRoutes.get('/list-of-portfolios', [authMiddleware], listCustomPortfolio);


export default customPortfolioRoutes;

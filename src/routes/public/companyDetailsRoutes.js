import express from 'express';
import { companyDetails, companyDividend, companyMarketInformation, priceEarningRatio, shareHolding } from '../../http/controllers/companyDetailsController.js';



const conpanyDetailsRoutes = express.Router();

conpanyDetailsRoutes.post('/company/price-earning-ratio', priceEarningRatio);
conpanyDetailsRoutes.post('/company/share-holding', shareHolding);
conpanyDetailsRoutes.post('/company/details', companyDetails);
conpanyDetailsRoutes.post('/company/market-information', companyMarketInformation);
conpanyDetailsRoutes.post('/company/company-dividend', companyDividend);

export default conpanyDetailsRoutes;

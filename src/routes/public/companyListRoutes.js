import express from 'express';
import {
  getCompanySearchByTradeCode,
  getDseIndex,
  getTrendingList
} from '../../http/controllers/companyListController.js';


const conpanyListRoutes = express.Router();

conpanyListRoutes.get('/company-list', getCompanySearchByTradeCode);
conpanyListRoutes.get('/trending-list', getTrendingList);
conpanyListRoutes.get('/dse-index', getDseIndex);


export default conpanyListRoutes;

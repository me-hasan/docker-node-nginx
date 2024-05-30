import express from 'express';
import { authMiddleware } from '../../http/middleware/authMiddleware.js';
import { addCompanyInWatchList, companyListByWatchList, createWatchList, companyWatchListDetails, companyListByTrendingId, watchListDeleteById, watchListWithCompanyCount } from '../../http/controllers/private/watchListController.js';


const watchListRoutes = express.Router();

watchListRoutes.post('/create-watch-list', [authMiddleware], createWatchList);
watchListRoutes.post('/company-add-in-watch-list', [authMiddleware], addCompanyInWatchList);
watchListRoutes.get('/company-watch-list-details', [authMiddleware], companyWatchListDetails);
watchListRoutes.post('/company-list-search-by-watch-list-id', [authMiddleware], companyListByWatchList);
watchListRoutes.post('/company-list-by-trending-id', [authMiddleware], companyListByTrendingId);
watchListRoutes.delete('/watch-list-delete-by-id', [authMiddleware], watchListDeleteById);
watchListRoutes.get('/watch-list-with-company-count', [authMiddleware], watchListWithCompanyCount);

export default watchListRoutes;

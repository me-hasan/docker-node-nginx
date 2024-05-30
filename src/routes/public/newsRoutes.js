import express from 'express';
import { allNewsSource, allNewsType, displayNewsOnSearchPage, newDetails, searchingNewsByDayWise, searchingNewsBySource, searchingNewsByTradeCode } from '../../http/controllers/newsController.js';


const newsRoutes = express.Router();


newsRoutes.get('/news/type', allNewsType);

newsRoutes.post('/news/display-news-on-search-page', displayNewsOnSearchPage);

newsRoutes.get('/news/:uuid/details', newDetails);

newsRoutes.post('/news/searching-news-by-trade-code', searchingNewsByTradeCode);

newsRoutes.post('/news/searching-news-by-day-wise', searchingNewsByDayWise);

newsRoutes.post('/news/searching-news-by-source', searchingNewsBySource);

newsRoutes.get('/news/source', allNewsSource);

export default newsRoutes;



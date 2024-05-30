import { ControllerWrapper } from "../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../common/utils/sendResponse.js";
import { showAllNewsSource, showAllNewsType, showDisplayNewsOnSearchPage, showNewDetails, showSearchingNewsByDayWise, showSearchingNewsBySource, showSearchingNewsByTradeCode } from "../../services/newsService.js";



export const allNewsType = ControllerWrapper(async (req, res) => {
    try {
        const newsType = await showAllNewsType();
        SendResponse(res, 200, newsType);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error' });
    }
});


export const displayNewsOnSearchPage = ControllerWrapper(async (req, res) => {
    const { tradeCode, newsType, days } = req.body;
    // Validate parameters
    if (!Array.isArray(tradeCode) || !Array.isArray(newsType) || typeof days !== 'number') {
        return SendResponse(res, 400, req.body, { error: 'Invalid input parameters' });
    }

    try {
        const news = await showDisplayNewsOnSearchPage(tradeCode, newsType, days);
        SendResponse(res, 200, news, null);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error' });
    }
});


export const newDetails = ControllerWrapper(async (req, res) => {
    const { uuid } = req.params;
    // Validate parameters
    if (!uuid) {
        return SendResponse(res, 400, null, { error: 'Invalid input parameters' });
    }

    try {
        const news = await showNewDetails(uuid);
        SendResponse(res, 200, news, null);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error sss'+error });
    }
});


export const searchingNewsByTradeCode = ControllerWrapper(async (req, res) => {
    const { tradeCode } = req.body;
    // Validate parameters
    if (!Array.isArray(tradeCode)) {
        return SendResponse(res, 400, req.body, { error: 'Invalid input parameters' });
    }

    try {
        const news = await showSearchingNewsByTradeCode(tradeCode);
        SendResponse(res, 200, news, null);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error' + error});
    }
});


export const searchingNewsByDayWise = ControllerWrapper(async (req, res) => {
    const { days } = req.body;
    // Validate parameters
    if (typeof days !== 'number') {
        return SendResponse(res, 400, req.body, { error: 'Invalid input parameters' });
    }

    try {
        const news = await showSearchingNewsByDayWise(days);
        SendResponse(res, 200, news, null);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error' + error});
    }
});


export const searchingNewsBySource = ControllerWrapper(async (req, res) => {
    const { newsSource } = req.body;
    // Validate parameters
    if (!Array.isArray(newsSource)) {
        return SendResponse(res, 400, req.body, { error: 'Invalid input parameters' });
    }

    try {
        const news = await showSearchingNewsBySource(newsSource);
        SendResponse(res, 200, news, null);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error' + error});
    }
});


export const allNewsSource = ControllerWrapper(async (req, res) => {
    try {
        const newsType = await showAllNewsSource();
        SendResponse(res, 200, newsType);
    } catch (error) {
        SendResponse(res, 500, null, { error: 'Internal Server Error' });
    }
});


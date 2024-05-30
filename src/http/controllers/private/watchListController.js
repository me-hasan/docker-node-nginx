import { ControllerWrapper } from "../../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../../common/utils/sendResponse.js";
import { storeCompanyWatchList, storeWatchList, getCompanyWatchListDetails, getCompanyListByWatchList, getCompanyListByTrendingId, deleteWatchlistById, getWatchListWithCompanyCount } from "../../../services/watchListService.js";


export const createWatchList = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
        return;
    }

    const watchList = req.body;
    if(!watchList || !watchList.name){
        SendResponse(res, 400, null, 'Name field is required!');
        return;
    }

    try {
        const watchListName = await storeWatchList(req.user._id, watchList);
        SendResponse(res, 201, watchListName);
    } catch (error) {
        if (error.message === 'Watch list already exists') {
            SendResponse(res, 403, null, 'Watch list already exists');
        } else {
            SendResponse(res, 500, null, 'Internal Server Error');
        }
    }
});



export const addCompanyInWatchList = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const requestData = req.body;

    const watchListName = await storeCompanyWatchList(requestData);
    SendResponse(res, 201, watchListName);
});


export const companyWatchListDetails = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const watchListNameWithComanyList = await getCompanyWatchListDetails(req.user._id);
    SendResponse(res, 200, watchListNameWithComanyList);
});


export const companyListByWatchList = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { watchListMstId } = req.body;

    const companyList = await getCompanyListByWatchList(watchListMstId);
    SendResponse(res, 200, companyList);
});


export const companyListByTrendingId = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { trendingId } = req.body;

    const companyList = await getCompanyListByTrendingId(trendingId);
    
    if(companyList){
        SendResponse(res, 200, companyList);
    }else{
        SendResponse(res, 200, []);
    }
    
});

export const watchListDeleteById = ControllerWrapper(async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return SendResponse(res, 400, null, 'Invalid request, user ID missing');
        }

        const { watchListMstId } = req.body;

        if (!watchListMstId) {
            return SendResponse(res, 400, null, 'Watch List Mst Id is required');
        }

        // Attempt to delete the watchlist
        const deleted = await deleteWatchlistById(watchListMstId);

        if (deleted) {
            // Send success response
            return SendResponse(res, 200, null, 'Watchlist deleted successfully.');
        } else {
            // If the watchlist was not found or could not be deleted
            return SendResponse(res, 404, null, 'Watchlist not found or could not be deleted.');
        }
    } catch (error) {
        if (error.status === 404) {
            // Send "Not Found" response if watchlist not found
            return SendResponse(res, 404, null, 'Watch list not found!');
        } else {
            // Send generic error response for other errors
            return SendResponse(res, 500, null, 'Internal Server Error');
        }
    }
});

export const watchListWithCompanyCount = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const companyList = await getWatchListWithCompanyCount(req.user._id);
    SendResponse(res, 200, companyList);
});

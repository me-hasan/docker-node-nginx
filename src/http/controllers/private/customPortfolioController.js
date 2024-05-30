import { ControllerWrapper } from "../../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../../common/utils/sendResponse.js";
import { getListOfPortfolios, storeCustomPortfolio } from "../../../services/customPortfolioService.js";


export const createCustomPortfolio = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { name, commission, initialDeposit } = req.body;

    // Check if any required data is missing
    if (!name || !commission) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const { data, flag } = await storeCustomPortfolio(req.user._id, req.body);
        const message = flag === 1 ? 'Data successfully added!' : 'Exist! Alearedy added data successfully.';
        SendResponse(res, 201, data, message);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});


export const listCustomPortfolio = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    try {
        const {data, flag} = await getListOfPortfolios(req.user._id);
        const message = flag === 1 ? 'Data found' : 'Data not found';
        SendResponse(res, 201, data, message);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});





import { ControllerWrapper } from "../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../common/utils/sendResponse.js";
import { getCompanyDetailsData, getCompanyDividendData, getCompanyMarketInformationData, getPriceEarningRatioData, getShareHoldingData } from "../../services/conmanyDetailsService.js";


export const priceEarningRatio = ControllerWrapper(async (req, res) => {
    const requestData = req.body.comCode;

    if (!requestData) {
        SendResponse(res, 400, null, 'comCode cannot be empty');
        return;
    }

    try {
        const convertedData = await getPriceEarningRatioData(requestData);
        SendResponse(res, 201, convertedData);
    } catch (error) {
        // Handle potential errors from the service
        SendResponse(res, 500, null, 'Internal Server Error');
    }
});

export const shareHolding = ControllerWrapper(async (req, res) => {
    const requestData = req.body.comCode;

    if (!requestData) {
        SendResponse(res, 400, null, 'comCode cannot be empty');
        return;
    }

    try {
        const convertedData = await getShareHoldingData(requestData);
        SendResponse(res, 201, convertedData);
    } catch (error) {
        // Handle potential errors from the service
        SendResponse(res, 500, null, error.message);
    }
});


export const companyDetails = ControllerWrapper(async (req, res) => {
    const requestData = req.body.comCode;

    if (!requestData) {
        SendResponse(res, 400, null, 'comCode cannot be empty');
        return;
    }

    try {
        const convertedData = await getCompanyDetailsData(requestData);
        SendResponse(res, 201, convertedData);
    } catch (error) {
        // Handle potential errors from the service
        SendResponse(res, 500, null, error.message);
    }
});


export const companyMarketInformation = ControllerWrapper(async (req, res) => {
    const requestData = req.body.comCode;

    if (!requestData) {
        SendResponse(res, 400, null, 'comCode cannot be empty');
        return;
    }

    try {
        const convertedData = await getCompanyMarketInformationData(requestData);
        SendResponse(res, 200, convertedData);
    } catch (error) {
        SendResponse(res, 500, null, error.message);
    }
});


export const companyDividend = ControllerWrapper(async (req, res) => {
    const requestData = req.body.comCode;

    if (!requestData) {
        SendResponse(res, 400, null, 'comCode cannot be empty');
        return;
    }

    try {
        const convertedData = await getCompanyDividendData(requestData);
        SendResponse(res, 201, convertedData);
    } catch (error) {
        // Handle potential errors from the service
        SendResponse(res, 500, null, error.message);
    }
});




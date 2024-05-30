import { ControllerWrapper } from "../../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../../common/utils/sendResponse.js";
import { fetchRequestFeatureByFilter, storeRequestFeature, voteRequestFeatureData } from "../../../services/requestFeatureService.js";
import pkg from 'lodash';
const { trim } = pkg;

export const createRequestFeature = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const {title, description } = req.body;

    
    // Check if any required data is missing
    if (!title || !trim(title) || !description) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const alertInfo = await storeRequestFeature(req.user._id, req.body);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});


export const getRequestFeatureByFilter = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { filter } = req.params;

    if (!filter) {
        return SendResponse(res, 400, null, 'Missing required param in url');
    }

    try {
        const requestFeatureData = await fetchRequestFeatureByFilter(req.user._id, filter);
        SendResponse(res, 200, requestFeatureData);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});


export const voteRequestFeature = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { featureId } = req.params;

    if (!featureId) {
        return SendResponse(res, 400, null, 'Missing required param in url');
    }

    try {
        const udpateVote = await voteRequestFeatureData(req.user._id, featureId);
        SendResponse(res, 201, udpateVote);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});





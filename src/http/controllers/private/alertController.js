import { ControllerWrapper } from "../../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../../common/utils/sendResponse.js";
import { deleteAlertData, deleteCompanyAlertData, fetchAlertsByCompany, fetchAlertsByComCode, fetchAllAlerts, fetchAllAlertsByCompanyComCode, storeAlert, toggleStatusAlertData, toggleStatusCompanyAlertData, updateAlertData } from "../../../services/alertService.js";


export const createAlert = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const {comCode, alertType, min, max, notificationType } = req.body;

    // Check if any required data is missing
    if (!comCode || !alertType || !notificationType || (min === null && max === null)) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const alertInfo = await storeAlert(req.user._id, req.body);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const getAllAlerts = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }


    try {
        const alertInfo = await fetchAllAlerts(req.user._id);
        SendResponse(res, 200, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});


export const getAllAlertsByComCode = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { comCode } = req.params;

    if (!comCode) {
        return SendResponse(res, 400, null, 'Missing comCode parameter');
    }

    try {
        const alertInfo = await fetchAllAlertsByCompanyComCode(comCode);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const getAlertsByCompany = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { companyId } = req.params;

    if (!companyId) {
        return SendResponse(res, 400, null, 'Missing company ID parameter');
    }

    try {
        const alertInfo = await fetchAlertsByCompany(companyId);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const updateAlert = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { alertId } = req.params;

    if (!alertId) {
        return SendResponse(res, 400, null, 'Missing required param in url');
    }

    const {alertType, min, max, notificationType } = req.body;

    // Check if any required data is missing
    if (!alertType || !notificationType || (min === null && max === null)) {
        return SendResponse(res, 400, null, 'Missing required params in body');
    }

    try {
        const alertInfo = await updateAlertData(req.body, alertId);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const deleteCompanyAlert = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { companyId } = req.params;

    if (!companyId) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const alertInfo = await deleteCompanyAlertData(companyId);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const deleteAlert = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { alertId } = req.params;

    // Check if any required data is missing
    if (!alertId) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const alertInfo = await deleteAlertData(alertId);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const updateStatusCompanyAlert = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { companyId } = req.params;

    if (!companyId) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const alertInfo = await toggleStatusCompanyAlertData(companyId);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});

export const udpateStatusAlert = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { alertId } = req.params;

    // Check if any required data is missing
    if (!alertId) {
        return SendResponse(res, 400, null, 'Missing required data');
    }

    try {
        const alertInfo = await toggleStatusAlertData(alertId);
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});


export const getAlertsByComCode = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        return SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const { comCode } = req.params;

    try {
        const alertInfo = await fetchAlertsByComCode(comCode, req.user._id);

        // Check if alertInfo is null or undefined
        if (!alertInfo) {
            return SendResponse(res, 201, [], 'Alert data not found');
            // Or handle it in any other appropriate way
        }
        
        SendResponse(res, 201, alertInfo);
    } catch (error) {
        SendResponse(res, 500, error, 'Internal Server Error');
    }
});



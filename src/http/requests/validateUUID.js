import { SendResponse } from "../../common/utils/sendResponse.js";

const uuidRegex = new RegExp('^[0-9a-fA-F]{8}-[0-9a-f]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$');
export const validateUUID = (req, res, next) => {
    const uuid = req.params.investorId; // Consider renaming to something like 'id' if this middleware is used for more than just investors

    if (!uuidRegex.test(uuid)) {
        SendResponse(res, 404, null, 'Invalid ID.');
        return; // Stop the middleware chain here
    }

    next();
};

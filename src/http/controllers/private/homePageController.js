import { ControllerWrapper } from "../../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../../common/utils/sendResponse.js";
import { showBootstrap, showBuyingPower } from "../../../services/homePageService.js";


export const bootstrap = ControllerWrapper(async (req, res) => {
        if (!req.user || !req.user._id) {
            SendResponse(res, 400, null, 'Invalid request, user ID missing');
        }
    
        const investor = await showBootstrap(req.user._id);
        SendResponse(res, 200, investor);
});

export const buyingPower = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const [ investor ] = await showBuyingPower(req.user._id) || {};
    SendResponse(res, 200, investor);
});
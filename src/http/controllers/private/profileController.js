import { showInvestorProfile } from '../../../services/profileService.js';
import { ControllerWrapper } from '../../../common/utils/controllerWrapper.js';
import { SendResponse } from '../../../common/utils/sendResponse.js';

export const investorProfile = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    const investor = await showInvestorProfile(req.user._id);
    SendResponse(res, 200, investor);
});






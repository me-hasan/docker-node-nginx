import { ControllerWrapper } from "../../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../../common/utils/sendResponse.js";
import { showPortfolioInsightSection, showPortfolioPerformance, showPricePerformance } from "../../../services/graphsService.js";



export const portfolioInsightSection = ControllerWrapper(async (req, res) => {
        if (!req.user || !req.user._id) {
            SendResponse(res, 400, null, 'Invalid request, user ID missing');
        }
    
        const investor = await showPortfolioInsightSection(req.user._id);
        SendResponse(res, 200, investor);
});


export const portfoliPerformance = ControllerWrapper(async (req, res) => {
    if (!req.user || !req.user._id) {
        SendResponse(res, 400, null, 'Invalid request, user ID missing');
    }

    if (!req.params.timeLabel) {
        return SendResponse(res, 400, null, 'Invalid request, time label missing');
    }

    const investor = await showPortfolioPerformance(req.params.timeLabel, req.user._id);
    SendResponse(res, 200, investor);
});

export const pricePerformance = ControllerWrapper(async (req, res) => {
    if (!req.params.timeLabel || !req.params.comCode) {
        SendResponse(res, 400, null, 'Invalid request, time label and company code is missing');
    }

    const investor = await showPricePerformance(req.params.timeLabel, req.params.comCode);
    SendResponse(res, 200, investor);
});


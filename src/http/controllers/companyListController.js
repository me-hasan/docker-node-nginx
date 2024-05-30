import { ControllerWrapper } from "../../common/utils/controllerWrapper.js";
import { SendResponse } from "../../common/utils/sendResponse.js";
import { companySearchByTradeCode, dseIndexList, trendingList} from "../../services/conmanyListService.js";

export const getCompanySearchByTradeCode = ControllerWrapper(async (req, res) => {
    const companyList = await companySearchByTradeCode(); 
    SendResponse(res, 200, companyList);
});

export const getTrendingList = ControllerWrapper(async (req, res) => {
    const list = await trendingList(); 
    SendResponse(res, 200, list);
});

export const getDseIndex = ControllerWrapper(async (req, res) => {
    const list = await dseIndexList(); 
    SendResponse(res, 200, list);
});
import moment from "moment-timezone";
import ImdsIdx from "../models/imdsIdx.js";
import TrendingList from "../models/trendingList.js";
import CompanyInfoMst from "../models/companyInfoMst.js";
import ImdsMkIstats from "../models/imdsMkIstats.js";

export const companySearchByTradeCode = async () => {
    try {
        const companyList = await CompanyInfoMst.findAll({
            attributes: ['trading_code','com_code', 'company_name'], 
            order: [
                ['com_code', 'ASC'] 
            ],
            include: [{ 
                model: ImdsMkIstats, 
                as: 'imdsMkIstatsMany', 
                order: [['mkstat_lm_date_time', 'DESC']], 
                limit: 1
            }]
        });
        // return companyList
        const result = companyList.map((item)=> {
            return {
                comCode : item?.com_code,
                tradeCode : item?.trading_code,
                companyName : item?.company_name,
                companyLogo: '',
                lastTradePrice: item?.imdsMkIstatsMany?.[0]?.mkstat_pub_last_trade_price
            };
        });

        return result; 
        
    } catch (error) {
        // Handle errors
        console.error('Error in companySearchByTradeCode:', error);
        throw new Error('Failed to retrieve company list', error);
    }
};



export const trendingList = async () => {
    return await TrendingList.findAll({
        attributes: ['id', 'trending_name'], 
    });
};


export const dseIndexList = async () => {
    return await ImdsIdx.findAll({
        attributes: ['idx_index_id', 'idx_capital_value', 'idx_deviation', 'idx_percentage'],
        order: [['created_at', 'DESC']], // Sorting by idx_date_time in descending order
        limit: 3
    });
};
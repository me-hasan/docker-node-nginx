import moment from 'moment-timezone';
import AuthServiceError from '../common/helpers/ThrowError.js';
import WatchListMst from '../models/watchListMst.js';
import WatchListChd from '../models/watchListChd.js';
import CompanyInfoMst from '../models/companyInfoMst.js';
import ImdsMkIstats from '../models/imdsMkIstats.js';
import TrendingList from '../models/trendingList.js';
import sequelize from '../database/db.js';
import { logger } from '../config/logger.js';


export const storeWatchList = async (userId, data) => {
    const { name } = data;

    const existingWatchListName = await WatchListMst.findOne({
        where: { watch_list_name: name, investor_id: userId, status: 1 }    
    });

    if (existingWatchListName) {
        throw new Error('Watch list already exists');
    }

    const watchList = await WatchListMst.create({
        watch_list_name: name,
        investor_id: userId,
        status: 1
    });
    
    return watchList;
};



export const storeCompanyWatchList = async (data) => {
    const { watchListMstId, comCode } = data;
    try {
        // Iterate over watchListMstId array
        await Promise.all(watchListMstId.map(async (watchId) => {
            // Iterate over comCode array
            for (const code of comCode) {
                const exists = await WatchListChd.findOne({
                    where: {
                        watch_list_mst_id: watchId,
                        com_code: code
                    }
                });

                // If it doesn't exist, create a new entry
                if (!exists) {
                    await WatchListChd.create({
                        watch_list_mst_id: watchId,
                        com_code: code,
                        status: 1
                    });
                }
            }
        }));
        return true;
    } catch (error) {
        // If there's an error in any operation, catch it and return false
        console.error('Error in storeCompanyWatchList:', error);
        return false;
    }
};



export const getCompanyWatchListDetails = async (investorId) => {
    try {
        const results = await WatchListMst.findAll({
            where: {
                investor_id: investorId,
                status: 1
            },
            attributes: ['watch_list_mst_id', 'watch_list_name'],

                include: [{
                    model: WatchListChd, 
                    as: 'watchListChd',
                    attributes: ['com_code'],

                        include: [{
                            model: CompanyInfoMst, 
                            as: 'companyInfoMst',
                            attributes: ['trading_code','company_name'],
                                include: [{
                                    model: ImdsMkIstats, 
                                    as: 'imdsMkIstats',
                                    order: ['mkstat_lm_date_time', 'DESC'],
                                    // attributes: ['mkstat_close_price', 'mkstat_yday_close_price']
                                }]
                        }]

                }]

        });

        // return results;
        // Transform the results to match the desired format
        const transformedResults = results.map(watchList => ({
            watchListMstId: watchList.watch_list_mst_id,
            watchListName: watchList.watch_list_name,
            watchListChd: watchList.watchListChd.map(chd => {
                const companyInfo = chd.companyInfoMst?.[0];
                const imdsData = companyInfo?.imdsMkIstats;

                const closePrice = imdsData?.mkstat_close_price;
                // const ydayClosePrice =  0;

                return {
                    com_code: chd.com_code ?? null,
                    trade_code: companyInfo?.trading_code ?? null,
                    company_name: companyInfo?.company_name ?? null,
                    price: closePrice ?? null,
                    percentage: ((closePrice - 20) / closePrice ) * 100 // need to percentage currention
                        
                };
            })
        }));

        return transformedResults;

    } catch (error) {
        console.error('Error in getWithListWithCompanyList:', error);
        return false;
    }
};




export const getCompanyListByWatchList = async (watchListMstId) => {
    try {
        const result = await WatchListMst.findOne({
            where: {
                watch_list_mst_id: watchListMstId,
                status: 1
            },
            attributes: ['watch_list_mst_id', 'watch_list_name'],
            include: [{
                model: WatchListChd, 
                as: 'watchListChd',
                attributes: ['com_code'],
                include: [{
                    model: CompanyInfoMst, 
                    as: 'companyInfoMst',
                    attributes: ['company_name'],
                    include: [{
                        model: ImdsMkIstats, 
                        as: 'imdsMkIstats',
                        order: [['mkstat_lm_date_time', 'DESC']],
                        attributes: ['mkstat_close_price', 'mkstat_yday_close_price'],
                        // limit: 1
                    }]
                }]
            }]
        });

        if (!result) return [];

        const transformedResult = result.watchListChd.map(chd => {
            const companyInfo = chd.companyInfoMst[0];
            const imdsData = companyInfo?.imdsMkIstats;

            const closePrice = imdsData?.mkstat_close_price;
            const ydayClosePrice = imdsData?.mkstat_yday_close_price;

            return {
                tradeCode: chd.com_code,
                companyName: companyInfo?.company_name,
                price: closePrice,
                percentage: (ydayClosePrice && closePrice) 
                    ? ((closePrice - ydayClosePrice) / ydayClosePrice) * 100 
                    : 0
            };
        });

        return transformedResult;

    } catch (error) {
        console.error('Error in getCompanyListByWatchList:', error);
        return false;
    }
};


export const getCompanyListByTrendingId = async (trendId) => {
    try {
        const trendQuery = await TrendingList.findOne({
            where: { id: trendId }
        });

        if (!trendQuery || !trendQuery.store_procedure) {
            throw new Error('Stored procedure not found for the given trendId');
        }

        const storeProcedure = trendQuery.store_procedure.trim();
        let paramValue = trendQuery.param ? trendQuery.param.trim() : null;

        // Form the SQL query
        let sqlQuery;
        if (paramValue) {
            sqlQuery = `SELECT * FROM public.${storeProcedure}('${paramValue}');`;
        } else {
            sqlQuery = `SELECT * FROM public.${storeProcedure}();`;
        }

        const result = await sequelize.query(sqlQuery, {
            type: sequelize.QueryTypes.SELECT
        });

        if (!result || result.length === 0) {
            throw new Error('No data found');
        }

        // Transform the data as needed
        const transformedData = result.map(val => ({
            comCode: val.com_code,
            tradeCode: val.trade_code,
            companyName: val.company_name,
            value: Number(val.close_price),
            percentage: Number(val.percentage)
        }));

        return transformedData;
    } catch (error) {
        // Handle or throw the error
        console.error('Error fetching top 10 gainers:', error);
        throw error;
    }
};

export const deleteWatchlistById = async (mstId) => {
    try {
        // Check if the watchlist exists before attempting to delete it
        const watchlistMst = await WatchListMst.findOne({ where: { watch_list_mst_id: mstId } });

        if (!watchlistMst) {
            // If the watchlist does not exist, log a message and return early
            logger.info('Watchlist not found.');
            return false; // Indicate that the watchlist was not found
        }

        // Delete the watchlist
        await watchlistMst.destroy();

        // Return true to indicate successful deletion
        return true;
    } catch (error) {
        // If an error occurs, log the error
        logger.error('Error deleting watchlist:', error);
        throw error;
    }
};

export const getWatchListWithCompanyCount = async (investorId) => {
    // Check if the watchlist exists before attempting to delete it
    try {
        // Find all watch lists with associated trade codes
        const watchLists = await WatchListMst.findAll({ where: { investor_id: investorId },
            include: [{
                model: WatchListChd,
                as: 'watchListChd' // Alias defined in the association
            }]
        });

        // Map the result to extract watch list names and their trade code counts
        const watchListsWithCounts = watchLists.map(watchList => {
            return {
                watchListId: watchList.watch_list_mst_id,
                watchListName: watchList.watch_list_name,
                tradeCodeCount: watchList.watchListChd.length
            };
        });

        return watchListsWithCounts;
    } catch (error) {
        console.error('Error in getWatchListsWithTradeCodeCount:', error);
        return null;
    }
};




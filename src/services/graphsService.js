import AuthServiceError from '../common/helpers/ThrowError.js';
import PortfolioStatement from '../models/portfolioStatement.js';
import CompanyInfoMst from '../models/companyInfoMst.js';
import PortfolioPerformance from '../models/portfolioPerformance.js';
import { Op } from 'sequelize';
import moment from 'moment';
import ImdsMkIstats from '../models/imdsMkIstats.js';




export const showPortfolioInsightSection = async (investorId) => {
  const portfolioStatements = await PortfolioStatement.findAll({
    attributes: ['*', 'market_value'],
      include: [{
          model: CompanyInfoMst,
          as: 'companyInfoMst',
          attributes: ['id', 'url', 'company_name', 'com_code', 'sector', 'sector_color_code'],
      }],
      where: {
          investor_id: investorId,
      },
  });

  if (!portfolioStatements || portfolioStatements.length === 0) {
      AuthServiceError.create(404, 'Data not found');
  }

  const sectorDataMap = new Map(); // Map to store count and total market value for each sector
  let totalMarketValue = 0;

  // Calculate sector-wise count and sum up the total market value
  for (const statement of portfolioStatements) {
      const sector_name = statement.companyInfoMst.sector;
      const existingData = sectorDataMap.get(sector_name) || { count: 0, totalValue: 0 };

      sectorDataMap.set(sector_name, {
          count: existingData.count + 1,
          totalValue: existingData.totalValue + (parseFloat(statement.market_value) || 0),
      });

      totalMarketValue += parseFloat(statement.market_value) || 0;
  }

  // Transform the data into the desired format
  const transformedData = Array.from(sectorDataMap.entries()).map(([sector_name, data]) => {
      const totalPercentage = (data.totalValue / totalMarketValue) * 100;
      const { sector_color_code } = portfolioStatements.find(item => item.companyInfoMst.sector === sector_name).companyInfoMst;

      return {
          sector_name,
          percentage: totalPercentage,
          sector_color_code,
      };
  });

  const responseData = {
      total_value: totalMarketValue,
      chart_data: transformedData,
  };

  return responseData;
};


export const showPortfolioPerformance = async (timeLabel, investorId) => {
    const param = {
        'oneday': [5, 1],
        'sevenday': [60, 6],
        'onemonth': [60, 30],
        'sixmonth': [1440, 180],
        'oneyear': [1440, 360],
        'fiveyear': [10080, 1800]
    };

    if (!param[timeLabel]) {
        // Adjust error handling, throwing an error with a message
        AuthServiceError.create(400, 'Invalid timeLabel');
    }

    const [interval, limit] = param[timeLabel];

    let portfolioPerformance = await PortfolioPerformance.findAll({
        where: {
            investor_id: investorId
        },
        order: [['date', 'ASC']],
    });

    if (!portfolioPerformance || portfolioPerformance.length === 0) {
        // Adjust error handling, throwing an error with a message
        AuthServiceError.create(404, 'Portfolio performance data not found');
    }

    const endDate = moment.max(portfolioPerformance.map(val => moment(val.date))).toDate();

    const startDate = moment(endDate).subtract(limit, 'days').toDate();


    portfolioPerformance = await PortfolioPerformance.findAll({
        where: {
            investor_id: investorId,
            date: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [['date', 'ASC']],
    });

    let totalMarketValue = 0;

    // Calculate sector-wise count and sum up the total market value
    for (const statement of portfolioPerformance) {
        totalMarketValue += parseFloat(statement.market_value_of_securities) || 0;
    }

    // Filter data to include entries that are 5 minutes apart
    const filteredData = portfolioPerformance.filter((val, index, array) => {
        if (index === 0) {
            return true;  // Include the first entry
        }
        const currentDateTime = moment(val.date);
        const previousDateTime = moment(array[index - 1].date);
        return currentDateTime.diff(previousDateTime, 'minutes') >= interval;
    });

    // filteredData.reverse();

    // Transform the data into the desired format
    const transformedData = filteredData.map(val => ({
        date: val.date,
        value: Number(val.equity),
        percentage: Number(val.percentage)
    }));

    const responseData = {
        totalValue: totalMarketValue,
        chartData: transformedData,
    };

    return responseData;
};


export const showPricePerformance = async (timeLabel, comCode) => {
    const timeParameters = {
        'oneday': [5, 1],
        'sevenday': [60, 6],
        'onemonth': [60, 30],
        'sixmonth': [1440, 180],
        'oneyear': [1440, 360],
        'fiveyear': [10080, 1800]
    };

    if (!timeParameters[timeLabel]) {
        throw new AuthServiceError(400, 'Invalid timeLabel');
    }

    const [interval, limit] = timeParameters[timeLabel];

    const pricePerformance = await getPricePerformanceData(comCode, interval, limit);
    if (pricePerformance.length === 0) {
        throw new AuthServiceError(404, 'Portfolio performance data not found');
    }

    const transformedData = transformData(pricePerformance, interval);

    return { chartData: transformedData };
};

const getPricePerformanceData = async (comCode, interval, limit) => {
    // Fetching initial raw data
    const rawData = await ImdsMkIstats.findAll({
        where: { mkstat_instrument_code: comCode },
        order: [['mkstat_lm_date_time', 'ASC']],
    });

    // Determining the date range for the data
    const endDate = moment.max(rawData.map(val => moment(val.mkstat_lm_date_time))).toDate();
    const startDate = moment(endDate).subtract(limit, 'days').toDate();

    // Fetching filtered data based on time parameters
    return ImdsMkIstats.findAll({
        where: {
            mkstat_instrument_code: comCode,
            mkstat_lm_date_time: { [Op.between]: [startDate, endDate] }
        },
        order: [['mkstat_lm_date_time', 'ASC']],
    });
};

const transformData = (data, interval) => {
    const transformed = data.filter((val, index, array) => {
        return index === 0 || moment(val.mkstat_lm_date_time).diff(moment(array[index - 1].mkstat_lm_date_time), 'minutes') >= interval;
    }).map((val, index, array) => {
        let percentageChange = 0;
        if (index !== 0) {
            const priceChange = val.mkstat_pub_last_trade_price - array[index - 1].mkstat_pub_last_trade_price;
            percentageChange = (priceChange / array[index - 1].mkstat_pub_last_trade_price) * 100;
        }
        
        return createDataEntry(val, percentageChange);
    });

    const lastEntry = transformed[transformed.length - 1] || {};
    return { transformed, lastValue: lastEntry.value, lastPercentageChange: lastEntry.percentage };
};


const createDataEntry = (val, percentageChange) => {
    return {
        date: val.mkstat_lm_date_time,
        value: Number(val.mkstat_pub_last_trade_price),
        percentage: percentageChange
    };
};














import { DOUBLE, Op } from 'sequelize';
import moment from 'moment';
import ThrowError from '../../common/helpers/ThrowError.js';
import ImdsMkIstats from '../../models/imdsMkIstats.js';



export const fetchPricePerformance = async (comCode) => {

    const [interval, limit] = [5, 1];

    const pricePerformance = await getPricePerformanceData(comCode, interval, limit);
    if (pricePerformance.length === 0) {
        throw new ThrowError(404, 'Portfolio performance data not found');
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
import { DOUBLE, Op } from 'sequelize';
import moment from 'moment';
import PortfolioPerformance from '../../models/portfolioPerformance.js';
import ThrowError from '../../common/helpers/ThrowError.js';

export const fetchPortfolioPerformance = async (investorId) => {
    let portfolioPerformance = await PortfolioPerformance.findAll({
        where: {
            investor_id: investorId,
        },
        order: [['date', 'ASC']],
    });

    if (!portfolioPerformance || portfolioPerformance.length === 0) {
        ThrowError.create(404, 'Portfolio performance data not found');
    }

    const endDate = moment.max(portfolioPerformance.map(val => moment(val.date))).toDate();
    const startDate = moment(endDate).subtract(1, 'days').toDate();

    portfolioPerformance = await PortfolioPerformance.findAll({
        where: {
            investor_id: investorId,
            date: {
                [Op.between]: [startDate, endDate],
            },
        },
        order: [['date', 'ASC']],
    });

    let totalMarketValue = 0;
    for (const statement of portfolioPerformance) {
        totalMarketValue += parseFloat(statement.market_value_of_securities) || 0;
    }

    const filteredData = portfolioPerformance.filter((val, index, array) => {
        if (index === 0) {
            return true;
        }
        const currentDateTime = moment(val.date);
        const previousDateTime = moment(array[index - 1].date);
        return currentDateTime.diff(previousDateTime, 'minutes') >= 5;
    });

    // filteredData.reverse();

    const transformedData = filteredData.map(val => ({
        date: val.date,
        value: Number(val.equity),
        percentage: Number(val.percentage),
    }));

    return {
        totalValue: totalMarketValue,
        chartData: transformedData,
    };
};

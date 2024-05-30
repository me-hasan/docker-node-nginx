import sequelize from '../../database/db.js'; 
import TrendingList from '../../models/trendingList.js';

export const fetchTrendData = async (trendId) => {
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


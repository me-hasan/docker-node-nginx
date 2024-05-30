import CompanyInfoMst from "../../models/companyInfoMst.js";
import PortfolioStatement from "../../models/portfolioStatement.js";

export const fetchPortfolio = async (investorId) => {
    let portfolioStatement = await PortfolioStatement.findAll({
        where: {
            investor_id: investorId,
        },
        include: [{
            model: CompanyInfoMst,
            as: 'companyInfoMst', // Make sure this alias matches the one in your association
            attributes: ['company_name'], // Select only the company name from the join
        }],
        attributes: ['com_code', 'market_value', 'total_qnt', 'percentage_mkt_value'], // Select specific columns
        order: [['date', 'ASC']],
    });

    if (!portfolioStatement || portfolioStatement.length === 0) {
        ThrowError.create(404, 'Portfolio performance data not found');
    }

    const transformedData = portfolioStatement.map(val => ({
        tradeCode: val.com_code,
        companyName: val.companyInfoMst.company_name, // Access the company name from the joined record
        numberOfBuyingShare : Number(val.total_qnt),
        value: Number(val.market_value),
        percentage: Number(val.percentage_mkt_value),
    }));

    return transformedData;
};

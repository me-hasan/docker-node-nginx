import moment from 'moment-timezone';
import AuthServiceError from '../common/helpers/ThrowError.js';
import CustomPortfolio from '../models/cumomPortfolio.js';
import BoAccount from '../models/boAccount.js';


export const storeCustomPortfolio = async (investorId, data) => {
    const { name, commission, initialDeposit } = data;

    // Check if an custom portfolio already exists for the given investor and trade code
    const existingCustomPortfolio = await CustomPortfolio.findOne({
        where: { investor_id: investorId, name: name }
    });

    if (!existingCustomPortfolio) {
        const saveData = await CustomPortfolio.create({
            name: name,
            investor_id: investorId,
            commission: commission,
            initials_deposit: initialDeposit,
            status: 1
        });

        return { data: saveData, flag: 1};
        
    } else {
        return { data: existingCustomPortfolio, flag: -1};
    }
};


export const getListOfPortfolios = async (investorId) => {

    // Check if a custom portfolio already exists for the given investor
    const portfolioList = await CustomPortfolio.findAll({
        where: { investor_id: investorId }
    });

    // Check if a BoAccount exists for the given investor
    const boAccount = await BoAccount.findAll({
        where: { investor_id: investorId }
    });

    let cusPortfolio = [];
    let ownPortfolio = [];
    
    if (portfolioList.length !== 0) {
        cusPortfolio = portfolioList.map( item => ({
            id: item.id,
            name: item.name,
            type: 'custom',
            tradeCode : null
        }));
    }

    if (boAccount.length !== 0) {
        ownPortfolio = boAccount.map( item => ({
            id: item.uuid,
            name: 'Wingsfin',
            type: 'own',
            tradeCode : item.trade_code
        }));
    }
     
    const result = [ ...cusPortfolio, ...ownPortfolio];

    return { data: result, flag: 1};
    
};




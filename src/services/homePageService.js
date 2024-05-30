import { Investor } from '../models/investor.js';

import moment from 'moment-timezone';
import AuthServiceError from '../common/helpers/ThrowError.js';
import BoAccount from '../models/boAccount.js';
import CommonSetup from '../models/commonSetup.js';
import BuyingPower from '../models/buyingPower.js';



export const showBootstrap = async (userId) => {
    const setup = await CommonSetup.findAll();

    // Current time 
    const currentDateTimeDhaka = moment().add(6, 'hours');
    const currentTimeDhaka = currentDateTimeDhaka.format('HH:mm');

    // Assuming bo_create_option is an array in setup
    const boCreateOptions = setup || [];

    // Extracting specific values based on labels
    const getValueByLabel = (label) => boCreateOptions.find(option => option.label === label)?.value;

    const stockMarketOpenCloseStatus = getValueByLabel('stock_market_open_close_status') || null;
    const stockMarketOpenTime = getValueByLabel('stock_market_open_time') || null;
    const stockMarketCloseTime = getValueByLabel('stock_market_close_time') || null;
    const boAccountCreate = getValueByLabel('bo_account_setup') ?? null;
    const fee = getValueByLabel('fee') || null;

    const investor = await Investor.findByPk(userId, {
        include: [{
            model: BoAccount,
            as: 'boAccount'
        }, {
            model: BuyingPower,
            as: 'buyingPower'
        }]
    });

    if (!investor) {
        AuthServiceError.create(404, 'Investor not found');
    }

    const portfolioOption = {
        show: !!investor.buyingPower[0]
    };

    const boCreateOption = {
        show: boAccountCreate === 'on' && !investor.boAccount,
        account_fees: fee
    };

    const buyingPowerOption = {
        show: !!investor.boAccount
    };

    const marketOnOffOption = {
        show: stockMarketOpenCloseStatus === 'on' &&  currentDateTimeDhaka.isBetween( moment(stockMarketOpenTime, 'HH:mm'), moment(stockMarketCloseTime, 'HH:mm')),
        curr_time: currentTimeDhaka,
        start_time: stockMarketOpenTime,
        end_time: stockMarketCloseTime,
    };

    return {
        bo_create_option: boCreateOption,
        buying_power_option: buyingPowerOption,
        markate_on_off: marketOnOffOption,
        portfolio_option : portfolioOption
    };

};

export const showBuyingPower = async (userId) => {
    const investor = await Investor.findByPk(userId, {
        include: [{
            model: BuyingPower,
            as: 'buyingPower'
        }]
    });
    
    if (!investor) {
        AuthServiceError.create(404, `Investor with ID ${userId} not found`);
    }
    
    const buyingPower = investor?.buyingPower || [];
    
    const result = buyingPower.map((row) => {
        const { cash, margin, fund_in_transit } = row;
        const total = Number(cash) + Number(margin);
    
        return {
            total,
            cash: Number(cash),
            margin: Number(margin),
            fund_in_transit: Number(fund_in_transit)
        };
    });
    
    return result || {
        total: null,
        cash: null,
        margin: null,
        fund_in_transit: null
    };    
};


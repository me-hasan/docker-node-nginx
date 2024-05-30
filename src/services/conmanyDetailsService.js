import { Sequelize } from "sequelize";
import CompanyDividend from "../models/companyDividend.js";
import ImdsMkIstats from "../models/imdsMkIstats.js";
import PriceEarningRatio from "../models/priceEarningRatio.js";
import ShareHolding from "../models/shareHolding.js";
import CompanyInfoMst from "../models/companyInfoMst.js";


export const getPriceEarningRatioData = async (comCode) => {
    try {
        const earningRatio = await PriceEarningRatio.findAll({
            where: {
                com_code: comCode
            },
            order: [['created_at', 'DESC']],
            limit: 12
        });

        let tempStorage = {
            unaudited: {},
            audited: {}
        };

        earningRatio.forEach(item => {
            let epsType = item.particular.includes("Basic") ? 'basic_esp' : 'diluted_esp';
            let epsValue = item.value === '-' ? null : parseFloat(item.value);
            let formattedDate = item.date;

            let category = item.type === 'Un-Audited' ? 'unaudited' : 'audited';

            if (!tempStorage[category][formattedDate]) {
                tempStorage[category][formattedDate] = { particular_date: formattedDate };
            }

            tempStorage[category][formattedDate][epsType] = epsValue;
        });

        let convertedData = {
            unaudited: [],
            audited: []
        };

        // Sorting function for dates
        const sortDates = (a, b) => new Date(a.particular_date) - new Date(b.particular_date);

        // Convert tempStorage to arrays and sort them
        convertedData.unaudited = Object.values(tempStorage.unaudited).sort(sortDates);
        convertedData.audited = Object.values(tempStorage.audited).sort(sortDates);

        return convertedData;
    } catch (error) {
        throw new Error('Error fetching price earning ratio data');
    }
};



export const getShareHoldingData = async (tradeId) => {
    try {
        // Fetch the most recent share holding data for the given tradeId
        const latestShareHolding = await ShareHolding.findOne({
            where: { com_code: tradeId },
            order: [['updated_at', 'DESC']] // Orders by updated_at in descending order
        });

        // Check if data exists
        if (!latestShareHolding) {
            return { data: { last_updated_date: null, chart_data: [] } }; // Return empty data if no record is found
        }

        // Format the last updated date
        const lastUpdatedDate = latestShareHolding.date_of_share_dis; 

        // Prepare the chart data based on the latest entry
        let chart_data = [
            {
                share_holder_name: "Foreign",
                percentage: latestShareHolding.foreign_share.toFixed(2),
                color_code: "ff7f0e"
            },
            {
                share_holder_name: "Director",
                percentage: latestShareHolding.sponsor_director.toFixed(2),
                color_code: "2ca02c"
            },
            {
                share_holder_name: "Govt.",
                percentage: latestShareHolding.govt.toFixed(2),
                color_code: "9467bd"
            },
            {
                share_holder_name: "Public",
                percentage: latestShareHolding.public.toFixed(2),
                color_code: "8c564b"
            },
            {
                share_holder_name: "Institute",
                percentage: latestShareHolding.institute.toFixed(2),
                color_code: "17becf"
            }
        ];

        // Return the structured data
        return  {
                last_updated_date: lastUpdatedDate ?? '',
                chart_data : chart_data ?? []
            };
    } catch (error) {
        throw new Error('Error fetching latest share holding data');
    }
};


export const getCompanyDetailsData = async (tradeId) => {
    try {
        const companyInfoMst = await CompanyInfoMst.findOne({
            where: { com_code: tradeId },
            attributes : ["company_name", "company_address_head_office", "company_contact_number", "company_email", "company_website"]
        });

        // Adding new property to the companyInfoMst object
        companyInfoMst.dataValues.company_details = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";

        return companyInfoMst.dataValues;
        
    } catch (error) {
        throw new Error('Error fetching latest share holding data');
    }
};


export const getCompanyMarketInformationData = async (tradeId) => {
    try {
        const companyInformation = await CompanyInfoMst.findOne({
            where: { com_code: tradeId },
            attributes: ["trading_code", "company_name", "company_listing_year", "company_category", "sector"],
        });

        if (!companyInformation) {
            throw new Error('Company information not found');
        }

        const imdsMkIstats = await ImdsMkIstats.findOne({
            where: { mkstat_instrument_code: companyInformation.trading_code },
            attributes: ["mkstat_lm_date_time", "mkstat_open_price", "mkstat_pub_last_trade_price", "mkstat_high_price", "mkstat_low_price", "mkstat_close_price", "mkstat_yday_close_price", "mkstat_total_volume", "mkstat_total_value"]
        });

        if (!imdsMkIstats) {
            throw new Error('Market statistics not found');
        }

        const information = companyInformationConvertToUnified(companyInformation);
        const listData = marketStatConvertToUnified(imdsMkIstats);

        return { information, listData };
    } catch (error) {
        throw new Error('Error fetching company market information data: ' + error.message);
    }
};


function companyInformationConvertToUnified(item){
    let transformedItem = {
        companyName: item.company_name,
        companyListingYear: item.company_listing_year,
        companyCategory: item.company_category,
        companySector: item.sector,
        yearEnd : '31 Dec'
    };
    return transformedItem;
};

function marketStatConvertToUnified(item){
    let marketUpdate = item.mkstat_lm_date_time;
    let change = item.mkstat_close_price - item.mkstat_yday_close_price; 


    let transformedItem = [
        {
            'info_name': 'Opening Price',
            'value': item.mkstat_open_price
        },
        {
            'info_name': 'Last Trade Price',
            'value': item.mkstat_pub_last_trade_price
        },
        {
            'info_name': 'High Price',
            'value': item.mkstat_high_price
        },
        {
            'info_name': 'Low Price',
            'value': item.mkstat_low_price
        },
        {
            'info_name': 'Close Price',
            'value': item.mkstat_close_price
        },
        {
            'info_name': 'Yesterday Close Price',
            'value': item.mkstat_yday_close_price
        },
        {
            'info_name': 'Change',
            'value':  change
        },
        {
            'info_name': 'Total Volume',
            'value': item.mkstat_total_volume
        },
        {
            'info_name': 'Total Value',
            'value': item.mkstat_total_value
        }
    ];

    return {
        marketUpdate,
        list: transformedItem
    }
};


export const getCompanyDividendData = async (tradeId) => {
    try {
        const inputArray = await CompanyDividend.findAll({
            where: { com_code: tradeId },
            attributes: [
                [Sequelize.col('year'), 'Year'],
                [
                    Sequelize.literal("CASE WHEN type = 'cash' THEN value END"),
                    'Cash'
                ],
                [
                    Sequelize.literal("CASE WHEN type = 'stock' THEN value END"),
                    'Stock'
                ]
            ],
            order: [['year', 'DESC']]
        });

        return inputArray
        
        const outputMap = new Map();
        
        inputArray.forEach(item => {
            const year = item.dataValues.Year;
            const cash = item.dataValues.Cash;
            const stock = item.dataValues.Stock;

            if (!outputMap.has(year)) {
                outputMap.set(year, { Year: year, Cash: null, Stock: null });
            }
            
            if (cash !== null) {
                outputMap.get(year).Cash = cash;
            }
            
            if (stock !== null) {
                outputMap.get(year).Stock = stock;
            }
        });
        
        return Array.from(outputMap.values());
    } catch (error) {
        throw new Error('Error fetching latest share holding data');
    }
};

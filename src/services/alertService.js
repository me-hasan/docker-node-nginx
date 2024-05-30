import moment from 'moment-timezone';
import AuthServiceError from '../common/helpers/ThrowError.js';
import AlertStockPriceMst from '../models/alertStockPriceMst.js';
import AlertStockPriceChd from '../models/alertStockPriceChd.js';
import CompanyInfoMst from '../models/companyInfoMst.js';
import ImdsMkIstats from '../models/imdsMkIstats.js';
import sequelize from '../database/db.js';



export const storeAlert = async (investorId, data) => {
    const { comCode, alertType, min, max, notificationType } = data;

    let masterTblId;

    // Check if an alert already exists for the given investor and trade code
    const existingAlert = await AlertStockPriceMst.findOne({
        where: { investor_id: investorId, com_code: comCode }
    });

    if (!existingAlert) {
        // Create a new master record if it doesn't exist
        const mstId = await AlertStockPriceMst.create({
            alert_name: '',
            investor_id: investorId,
            com_code: comCode,
            status: 1
        });

        masterTblId = mstId.id;
    } else {
        masterTblId = existingAlert.id;
    }

    // Create the child record
    const alertInfo = await AlertStockPriceChd.create({
        alert_mst_id: masterTblId,
        alert_type: alertType,
        min_value: min,
        max_value: max,
        notification_type: notificationType,
        status: 1
    });

    return alertInfo;
};

export const fetchAllAlerts = async (investorId) => {
    try {
        const alertData = await AlertStockPriceMst.findAll({
            where: { investor_id: investorId },
            include: [
                { model: CompanyInfoMst, as: 'companyInfoMst' },
                { model: AlertStockPriceChd, as: 'alertStockPriceChd' },
                { 
                    model: ImdsMkIstats, 
                    as: 'imdsMkIstats', 
                    order: [['mkstat_lm_date_time', 'DESC']], 
                    limit: 1 
                }
            ]
        });

        if (alertData.length === 0) {
            return [];
        }

        const transformedData = alertData.map(alert => {
            const { id, com_code, companyInfoMst, alertStockPriceChd, imdsMkIstats } = alert;
            const { company_name, trading_code, company_website } = companyInfoMst?.[0] || {};

            return {
                mstId: id,
                comCode: com_code,
                tradeCode: trading_code || 'Unknown',
                companyName: company_name || 'Unknown', 
                alertStatus: alert.status === 1, 
                numberOfAlert: alertStockPriceChd.length, 
                companyLogo: '', 
                lastTreadPrice: imdsMkIstats?.[0]?.mkstat_pub_last_trade_price || null, 
                companyWebsite: company_website || '' 
            };
        });

        return transformedData;
    } catch (error) {
        // Handle errors gracefully
        console.error('Error in fetchAllAlerts:', error);
        return { status: 'Error', message: error.message, data: [] };
    }
};


export const fetchAllAlertsByCompanyComCode = async (comCode) => {
    const alertData = await AlertStockPriceMst.findAll({
        where: { com_code: comCode },
        include: [{ model: AlertStockPriceChd, as: 'alertStockPriceChd' }]
    });

    // If no data is found, return an empty array
    if (!alertData || alertData.length === 0) {
        return [];
    }

    // Extract relevant information from the alertData
    const transformedData = alertData.map(alert => alert.alertStockPriceChd.map(chd => ({
        chdId: chd.id,
        alertType: chd.alert_type, // Assuming alert_type represents the alert type
        alertStatus: chd.status === 1, // Assuming status 1 means active
        max: chd.max_value,
        min: chd.min_value,
        notificationType: chd.notification_type // Assuming notification_type represents the notification type
    })));

    return transformedData.flat(); // Flatten the array of arrays
};



export const fetchAlertsByCompany = async (companyId) => {
    const alertData = await AlertStockPriceMst.findOne({
        where: { id: companyId },
        include: [{ model: AlertStockPriceChd, as: 'alertStockPriceChd' }]
    });

    // If no data is found, return an empty array
    if (!alertData) {
        return [];
    }

    // Extract relevant information from the alertData
    const transformedData = alertData.alertStockPriceChd.map(alert => ({
        chdId: alert.id,
        alertType: alert.alert_type, // Assuming alert_type represents the alert type
        alertStatus: alert.status === 1, // Assuming status 1 means active
        max: alert.max_value,
        min: alert.min_value,
        notificationType: alert.notification_type // Assuming notification_type represents the notification type
    }));

    return transformedData;
};



export const updateAlertData = async (data, alertId) => {
    const { alertType, min, max, notificationType } = data;

    try {
        // Update the existing alert
       await AlertStockPriceChd.update({
            alert_type: alertType,
            min_value: min,
            max_value: max,
            notification_type: notificationType,
            status: 1 
        }, {
            where: { id: alertId }
        });

        return 'Alert updated successfully';
    } catch (error) {
        // Handle errors
        console.error('Error in updateAlertData:', error);
        throw new Error('Invalid order type', error);
    }
};



export const deleteCompanyAlertData = async (alertId) => {
    try {
        await AlertStockPriceMst.destroy({
            where: { id: alertId },
            cascade: true, // This will trigger cascading delete
        });
        return "Master alert deleted successfully";
    
    } catch (error) {
        // Handle errors
        console.error('Error in updateAlertData:', error);
        throw new Error('Invalid order type', error);
    }
};

export const deleteAlertData = async (alertId) => {
    try {

        await AlertStockPriceChd.destroy({
            where: { id: alertId }
        });
        return "Child alert deleted successfully";

    } catch (error) {
        // Handle errors
        console.error('Error in updateAlertData:', error);
        throw new Error('Invalid order type', error);
    }
};


export const toggleStatusCompanyAlertData = async (alertId) => {
    let transaction;
    try {
        // Start a transaction
        transaction = await sequelize.transaction();

        // Find the current status of the master alert
        const masterAlert = await AlertStockPriceMst.findOne({where: {id: alertId}});
        if (!masterAlert) {
            throw new Error('Master alert not found');
        }

        // Toggle the status of the master alert
        const newMasterStatus = masterAlert.status ? 0 : 1;
        const newMasterStatusLabel = !masterAlert.status
        await AlertStockPriceMst.update(
            { status: newMasterStatus },
            { where: { id: alertId }, transaction }
        );

        // Always child should be false
        await AlertStockPriceChd.update(
            { status: 0 },
            { where: { alert_mst_id: alertId }, transaction }
        );

        // Commit the transaction
        await transaction.commit();

        return `Status toggled successfully. New status: ${newMasterStatusLabel}`;

    } catch (error) {
        // Rollback transaction on error
        if (transaction) await transaction.rollback();
        
        // Handle errors
        console.error('Error in toggleStatusCompanyAlertData:', error);
        throw new Error('Failed to toggle status for master alert and child records', error);
    }
};


export const toggleStatusAlertData = async (alertId) => {
    let transaction;
    try {
        // Start a transaction
        transaction = await sequelize.transaction();

        // Find the current status of the master alert
        const childAlert = await AlertStockPriceChd.findOne({where: {id: alertId}});
        if (!childAlert) {
            throw new Error('Child alert not found');
        }

        // Toggle the status of the master alert
        const mstId = childAlert.alert_mst_id;
        const newChildStatus = childAlert.status ? 0 : 1;
        const newChildStatusLabel = !childAlert.status

        // Toggle the status of the child records (assuming child records are related via foreign key)
        await AlertStockPriceChd.update(
            { status: newChildStatus },
            { where: { id: alertId }, transaction }
        );

        // Always child should be true
        await AlertStockPriceMst.update(
            { status: 1 },
            { where: { id: mstId }, transaction }
        );

        // Commit the transaction
        await transaction.commit();

        return `Status toggled successfully. New status: ${newChildStatusLabel}`;

    } catch (error) {
        // Rollback transaction on error
        if (transaction) await transaction.rollback();
        
        // Handle errors
        console.error('Error in toggleStatusCompanyAlertData:', error);
        throw new Error('Failed to toggle status for master alert and child records', error);
    }
};

export const fetchAlertsByComCode = async (comCode, investorId) => {
    try {
        const alertData = await AlertStockPriceMst.findOne({
            where: { com_code: comCode, investor_id: investorId },
            include: [
                { model: CompanyInfoMst, as: 'companyInfoMst' },
                { model: AlertStockPriceChd, as: 'alertStockPriceChd' },
                { 
                    model: ImdsMkIstats, 
                    as: 'imdsMkIstats', 
                    order: [['mkstat_lm_date_time', 'DESC']], 
                    limit: 1 
                }
            ]
        });


        if (!alertData) {
            return null;
        }
    
    
        const transformedData = {
            mstId: alertData.id,
            treadCode: alertData.companyInfoMst[0]?.com_code,
            companyName: alertData.companyInfoMst[0]?.company_name || 'Unknown', 
            alertStatus: alertData.status === 1, 
            numberOfAlert: alertData.alertStockPriceChd.length, 
            companyLogo: '', 
            lastTreadPrice: alertData.imdsMkIstats?.[0]?.mkstat_pub_last_trade_price || null, 
            companyWebsite: alertData.companyInfoMst[0]?.company_website || ''
        };
    
        return transformedData;

    } catch (error) {
        // Handle errors
        console.error('Error in toggleStatusCompanyAlertData:', error);
        throw new Error('Failed to fetch alert in trade code!', error);
    }


    
};





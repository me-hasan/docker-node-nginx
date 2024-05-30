import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import AlertStockPriceChd from './alertStockPriceChd.js';
import CompanyInfoMst from './companyInfoMst.js';
import ImdsMkIstats from './imdsMkIstats.js';

export class AlertStockPriceMst extends Model {}

AlertStockPriceMst.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
alert_name: {
    type: DataTypes.STRING,
    allowNull: true
},
investor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: 'Investor',
        key: 'uuid'
    }
},
com_code: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: 'CompanyInfoMst',
        key: 'com_code'
    }
},
status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '1 = Active, 0 = Inactive'
},created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
},
updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}
}, { sequelize, modelName: 'AlertStockPriceMst', tableName:'alert_stock_price_msts', timestamps: false });

AlertStockPriceMst.hasMany(CompanyInfoMst, {
    foreignKey: 'com_code',
    sourceKey : 'com_code',
    as: 'companyInfoMst'
});

AlertStockPriceMst.hasMany(AlertStockPriceChd, {
    foreignKey: 'alert_mst_id',
    sourceKey : 'id',
    onDelete: 'CASCADE',
    as: 'alertStockPriceChd'    
});

AlertStockPriceMst.hasMany(ImdsMkIstats, {
    foreignKey: 'mkstat_instrument_code',
    sourceKey : 'com_code',
    as: 'imdsMkIstats'
});

export default AlertStockPriceMst;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import CompanyInfoMst from './companyInfoMst.js';

export class PortfolioStatement extends Model {}

PortfolioStatement.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
investor_id: {
    type: DataTypes.UUID,
    allowNull: false
},
com_code: {
    type: DataTypes.UUID,
    allowNull: false
},
date: {
    type: DataTypes.DATE,
    allowNull: false
},
group: {
    type: DataTypes.STRING,
    allowNull: false
},
total_qnt: {
    type: DataTypes.INTEGER,
    allowNull: false
},
saleable_qnt: {
    type: DataTypes.INTEGER,
    allowNull: false
},
avg_cost: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
total_cost: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
market_rate: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},market_value: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},unrealized_gain_loss: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},percentage_gain_loss: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},percentage_mkt_value: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
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
}, { sequelize, modelName: 'PortfolioStatement', tableName:'portfolio_statements', timestamps: false });

PortfolioStatement.hasOne(CompanyInfoMst, {
    foreignKey: 'com_code',
    sourceKey : 'com_code',
    as: 'companyInfoMst'
});

export default PortfolioStatement;

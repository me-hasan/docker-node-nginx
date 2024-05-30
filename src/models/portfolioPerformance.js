import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class PortfolioPerformance extends Model {}

PortfolioPerformance.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
investor_id: {
    type: DataTypes.UUID,
    allowNull: false
},
date: {
    type: DataTypes.DATE,
    allowNull: false
},
mature_balance: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
market_value_of_securities: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
equity: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
percentage: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
}
,created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
},
updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}
}, { sequelize, modelName: 'PortfolioPerformance', tableName:'portfolio_performances', timestamps: false });


export default PortfolioPerformance;

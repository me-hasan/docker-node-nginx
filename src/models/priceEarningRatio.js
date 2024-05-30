import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class PriceEarningRatio extends Model {}

PriceEarningRatio.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
com_code: {
    type: DataTypes.STRING,
    allowNull: false
},
type: {
    type: DataTypes.STRING,
    allowNull: false
},
particular: {
    type: DataTypes.STRING,
    allowNull: false
},
date: {
    type: DataTypes.DATEONLY,
    allowNull: false
},
value: {
    type: DataTypes.STRING,
    allowNull: false
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
}, { sequelize, modelName: 'priceEarningRatio', tableName:'scrap_price_earning_ratios', timestamps: false });


export default PriceEarningRatio;

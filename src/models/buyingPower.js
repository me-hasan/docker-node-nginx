import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class BuyingPower extends Model {}

BuyingPower.init({
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
cash: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
margin: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    defaultValue: false
},
fund_in_transit: {
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
}, { sequelize, modelName: 'BuyingPower', tableName:'buying_powers', timestamps: false });

export default BuyingPower;

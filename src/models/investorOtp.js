import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class InvestorOtp extends Model {}

InvestorOtp.init({
uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
investor_id: {
    type: DataTypes.UUID,
    allowNull: false
},
otp: {
    type: DataTypes.STRING,
    allowNull: false
},
expires_at: {
    type: DataTypes.DATE,
    allowNull: false
},
is_used: {
    type: DataTypes.BOOLEAN,
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
}, { sequelize, modelName: 'InvestorOtp', tableName:'investor_otps', timestamps: false });

export default InvestorOtp;

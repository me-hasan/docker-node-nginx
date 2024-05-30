import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class CompanyDividend extends Model {}

CompanyDividend.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
com_code: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
year: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
value: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
type: {
    type: DataTypes.STRING(20),
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
}, { sequelize, modelName: 'CompanyDividend', tableName:'scrap_dividends', timestamps: false });

export default CompanyDividend;

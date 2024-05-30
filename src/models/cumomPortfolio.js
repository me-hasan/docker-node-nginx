import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';


export class CustomPortfolio extends Model {}

CustomPortfolio.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
investor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: 'Investor',
        key: 'uuid'
    }
},
name: {
    type: DataTypes.STRING,
    allowNull: true
},
commission: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
},
initials_deposit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
}, { sequelize, modelName: 'CustomPortfolio', tableName:'custom_portfolios', timestamps: false });



export default CustomPortfolio;

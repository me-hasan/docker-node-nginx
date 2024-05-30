import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class ShareHolding extends Model {}

ShareHolding.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
com_code: {
    type: DataTypes.STRING(30),
    allowNull: false
},
date_of_share_dis: {
    type: DataTypes.DATEONLY,
    allowNull: false
},
sponsor_director: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
govt: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
institute: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
foreign_share: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
public: {
    type: DataTypes.DOUBLE,
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
}, { sequelize, modelName: 'ShareHolding', tableName:'scrap_share_holdings', timestamps: false });


export default ShareHolding;

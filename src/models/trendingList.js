import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class TrendingList extends Model {}

TrendingList.init({
id: {
    type: DataTypes.INTEGER,
    primaryKey: true
},
trending_name: {
    type: DataTypes.STRING,
    allowNull: false
},
param: {
    type: DataTypes.STRING,
    allowNull: false
},
order_number: {
    type: DataTypes.STRING,
    allowNull: false
},
store_procedure: {
    type: DataTypes.STRING,
    allowNull: false
},
updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
}
}, { sequelize, modelName: 'TrendingList', tableName:'trending_lists', timestamps: false });

export default TrendingList;

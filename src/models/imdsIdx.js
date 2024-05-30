import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class ImdsIdx extends Model {}

ImdsIdx.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
idx_index_id: {
    type: DataTypes.STRING,
    allowNull: false
},
idx_date_time: {
    type: DataTypes.DATE,
    allowNull: false
},
idx_capital_value: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
idx_deviation: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
idx_percentage: {
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
}, { sequelize, modelName: 'ImdsIdx', tableName:'imds_idxes', timestamps: false });


export default ImdsIdx;

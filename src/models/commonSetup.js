import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class CommonSetup extends Model {}

CommonSetup.init({
id: {
    type: DataTypes.INTEGER,
    primaryKey: true
},
label: {
    type: DataTypes.STRING,
    allowNull: false
},
value: {
    type: DataTypes.STRING,
    allowNull: false
},
type: {
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
}, { sequelize, modelName: 'CommonSetup', tableName:'common_setups', timestamps: false });

export default CommonSetup;

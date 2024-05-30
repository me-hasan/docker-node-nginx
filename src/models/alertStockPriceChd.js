import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class AlertStockPriceChd extends Model {}

AlertStockPriceChd.init({
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
},
alert_mst_id: {
    type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'AlertStockPriceMst', 
            key: 'id'
        },
        onDelete: 'CASCADE'
},
alert_type: {
    type: DataTypes.ENUM('price', 'percentile'),
    allowNull: false
},
min_value: {
    type: DataTypes.DOUBLE,
    allowNull: true
},
max_value: {
    type: DataTypes.DOUBLE,
    allowNull: true
},
notification_type: {
    type: DataTypes.ENUM('once', 'repeated'),
    allowNull: false
},
status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '1 = active, 0 = Inactive'
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
}, { sequelize, modelName: 'AlertStockPriceChd', tableName:'alert_stock_price_chds', timestamps: false });


export default AlertStockPriceChd;

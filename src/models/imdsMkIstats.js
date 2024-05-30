import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export class ImdsMkIstats extends Model {}

ImdsMkIstats.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    mkstat_instrument_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mkstat_instrument_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mkstat_quote_bases: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_open_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_pub_last_trade_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_spot_last_trade_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_high_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_low_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_close_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_yday_close_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_total_trades: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_total_volume: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_total_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_public_total_trades: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_public_total_volume: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_public_total_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_spot_total_trades: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_spot_total_volume: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_spot_total_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    mkstat_lm_date_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, { sequelize, modelName: 'ImdsMkIstats', tableName:'imds_mk_istats', timestamps: false });


export default ImdsMkIstats;
